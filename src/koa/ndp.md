## akos基于ndp的构建与发布
## 前言
> NDP部署保证构建机和应用服务能正常运行node.js。
> 相关基本操作请阅读[NDP文档](http://doc.hz.netease.com/display/CLDNDP)
## 一、简述
    ndp主要功能有构建和发布。
    - 构建：完成代码生成，包括前端代码构建和后端代码构建，然后将生成的代码打包上传到nos上。
    - 发布：将从nos下载到的包进行解压，然后根据shell启动程序
## 二、构建流程

### 2.1 构建配置
#### 2.1.1 如图点击构建配置
<img src="http://filedoc.nos-eastchina1.126.net/f9640cc5470d866a55d0c4cee08f5dbe.jpg">
1. 进入构建设置目录
<img src="http://filedoc.nos-eastchina1.126.net/60aee23875141b79fbd48035e93b9f0b.jpg">

##### build.xml内容说明

    build.xml 可修改后使用。下列脚本，需要在构建机上放置服务本身需要的配置文件config
    下列为build.xml的配置内容，每个target为一个执行步骤。基本过程为：

    1. target:clean 清除压缩文件地址，保证不存在
    2. target:compress-web 创建存放压缩文件的地址
    3. target:cp 拷贝基本初始化工程文件（通过点击构建配置后，构建时生成）
    4. target:webapp 执行node bin/build,vusion打包，需要放置在工程目录下，node运行， vusion基本可以微调通用
    5. target:config-copy 复制配置文件（不存放git仓库的），需要联系构建机管理员预先建立文件夹放置在构建机上
    6. target:deploy 设置target调用顺序

##### build.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE project [<!ENTITY buildfile SYSTEM "file:./build-user.xml">]>
<project basedir="." default="deploy" name="demo">
	<property environment="env" />
	<property name="groovy" value="groovy"/>
	<property name="python" value="python"/>
	<property name="mvn" value="mvnJDK8" />
		&lt;-- 指定node目录 运营这边的构建机，根据nvm划分不同的版本，各版本node的环境独立 在webapp过程中使用-->
	<property name="nodePath" value="/home/appops/.nvm/versions/node/v6.10.2/bin" />  
		&lt;-- 指定拷贝配置文件路径，配置文件放在构建机上 -->
    <property name="dist.dir" value="target"/>
    <property name="compress.dir" value="compressed"/>
    <property name="nodeVersion" value="/home/appops/config/domain-test/nodeVersion.sh"/>
    <property name="srcConfig" value="/home/appops/config/domain-test/app.development.json" />
    <property name="desConfig" value="/home/appops/ndp/source/boss-comb-domain-test/src/config/app.development.json" />
    &lt;-- 清除已存在文件存放路径 -->
    <target name="clean">
            <delete dir="${compress.dir}"/>
    </target>
    	&lt;-- 压缩文件存放路径 -->
    <target name="compress-web">
            <mkdir dir="${compress.dir}"/>
            <antcall target="cp"/>
    </target>
        <target name="cp">
                <mkdir dir="compressed"/>
                <copy todir="compressed" overwrite="true">
                        <fileset dir=".">
                        	<exclude name="build.xml"/>
                        	<exclude name=".git"/>
                        	<exclude name=".svn"/>
                        	<exclude name="${compress.dir}"/>
                        </fileset>
                </copy>
        </target>
	&lt;-- bin/build 执行shell命令，用node执行，可自定义build的内容开放接口，vusion build的构建基本通用，参看后文 -->
	<target name="webapp">
		<exec dir="." executable="bin/build" failonerror="true">
			<env key="PATH" value="${nodePath}:${env.PATH}" />
		</exec>
	</target>
&lt;-- 复制配置文件，需要将配置文件预先放置在构建机上，路径自定义-->
    <target name="config-copy">
		<copy file="${srcConfig}" tofile="${desConfig}"/>
	</target>
	&lt;-- 调用顺序 -->
	<target name="deploy">
		<echo message="begin auto deploy......"/>
		<antcall target="clean"/>
		<antcall target="webapp"/>
        <antcall target="config-copy"/>
		<antcall target="compress-web"/>
	</target>
</project>
```
##### bin/build
vusion build 均可微调此文件后使用，build文件放置在工程根目录 bin/（可自定义，此文件与构建机基本配置无关，而是构建机node bin/build时需要调用）
```js
#!/usr/bin/env node

/**
 * Install npm packages 安装依赖包
 */
const spawnSync = require('child_process').spawnSync;
spawnSync('rm', ['-rf', 'node_modules']);
const npmResult = spawnSync('npm', ['--registry=http://rnpm.hz.netease.com/', '--registryweb=http://npm.hz.netease.com/', 'install']);
if (npmResult.status)
    throw new Error(String(npmResult.stderr));

const shell = require('shelljs');
const semver = require('semver');

/**
 *
 */
// node >= 6
const nodeVersion = shell.exec('node -v', { silent: true }).stdout.trim();
console.log('node version:', nodeVersion);
const npmVersion = shell.exec('npm -v', { silent: true}).stdout.trim();
console.log('npm version:', npmVersion);

const vusionResult = shell.exec('vusion -V', { silent: true });
const vusionVersion = vusionResult.stdout.trim();
//vusion版本控制
const expectedVersion = '0.6.1';
console.log('***************************vsuionResult**************************')
shell.exec('vusion -V');
// console.log(semver.lt(vusionVersion, expectedVersion));
console.log('***************************vsuionResult End**************************')
if (vusionResult.code || semver.lt(vusionVersion, expectedVersion)) {
    shell.exec('npm rm -g vusion-cli');
    console.log('***************************vusion install config**************************')
    shell.exec('npm config ls');
    console.log('***************************vusion install config end**************************')
    const installResult = shell.exec('npm --registry=http://rnpm.hz.netease.com/ --registryweb=http://npm.hz.netease.com/ install -g vusion-cli@0.5.1');
    console.log('***************************vusion install result**************************')
    shell.exec('installResult');
    console.log('***************************vusion install result end**************************')
    if (installResult.code)
        throw new Error(installResult.stderr);
} else {
    console.log('vusion version:', vusionVersion);
}

/**
 * Build
 */
shell.echo('Start build webapp...');
console.log('***************************vusion config**************************')
shell.exec('npm config ls');
console.log('***************************vusion config end**************************')
console.log('***************************vusion cmd place**************************')
shell.exec('which vusion');
console.log('***************************vusion cmd place end**************************')
//执行vusion build
if (shell.exec('vusion build').code)
    process.exit(1);

```

## 三、发布流程
### 3.1 如图点击发布配置
<img src="http://filedoc.nos-eastchina1.126.net/8dd810ed41ef402b09de18e966e87f32.jpg" >

### 3.2 点击增加实例

<img src="http://filedoc.nos-eastchina1.126.net/a2d9aab8b428a1ffb1ca467bfd12e5e5.jpg" >

### 3.3 配置登录项目服务器配置并保存发布配置
需要选择相应模板，目前node的ndp上生态还不完善，目前的几个模板均开放shell脚本执行，即sh start.sh，具体执行可在脚本中实现。
<img src="http://filedoc.nos-eastchina1.126.net/a148bd736527dce6569c1b2d36b94c5a6.jpg" >
<img src="http://filedoc.nos-eastchina1.126.net/ab29071995d04ac976d59a444529d321c.jpg" >

### 3.4 服务器上 start.sh启动脚本举例

```
#!/bin/sh
# 使nvm命令生效，建议用nvm管理服务器的node版本。在build.xml中可随意指向不同的node版本
. ~/.nvm/nvm.sh
nvm --version
nvm use 6.10.2
source ~/config/.bashrc
pm2 start app.json

```

## 四、构建与发布操作

-  完成构建配置与发布配置后便可以进行发布了，如下图所示，先选择构建，构建成功后进行发布，构建完毕后，项目发布完毕。
 <img src="http://filedoc.nos-eastchina1.126.net/0c13ac6dcef82f7850909e3ace10ab27.jpg">
 
 

 
