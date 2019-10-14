## 基于Egg框架模板的Lru缓存，推荐使用插件egg-lru
### 前言
---
> Lru缓存功能比较单一，主要利用app所在服务器内存设计，不需要像redis需要部署服务器。
> 1. 优点：
 > - 消耗小，有效所在服务器的资源，不需要网络请求即可获得缓存数据。
> 2. 缺点:
>   - 服务重启数据全丢
>   - 可拓展性弱
>   - 不支持服务集群模式
>
> 由于lru缓存仅在应用所在服务器，故不支持集群内多服务器的数据共享，仅能针对所在服务器接口范围内的性能优化。


### 一、Install

```npm
npm i egg-lru --save
```
### 二、Configuration
### 插件引入
```js
// config/plugin.js文件中增加插件引入
exports.lru = {
  enable: true,
  package: 'egg-lru',
};
```

### 三、Lru配置设置
#### 3.1 单队列缓存模式
```js
// 在config/config.default.js增加redis服务配置
exports.lru = {
  client: {
    // all lru cache config available here
    max: 1000,
    maxAge: 1000 * 60 * 60, // 60 min cache
  },
  // load into app, default is open
  app: true,
  // load into agent, default is close
  agent: false,
};
```
#### 用法
```js
// you can access to simple lru instance by using app.lru
app.lru.set('test', 'aaa') ;
app.lru.get('test');
```
#### 3.2 多队列缓存模式
```js
exports.lru = {
  clients: {
    long: {
      max: 1000,
      maxAge: 1000 * 60 * 60, // 60 min cache
    },
    moment: {
      max: 1000,
      maxAge: 1000, // 1 second cache
    },
  },
  // load into app, default is open
  app: true,
  // load into agent, default is close
  agent: false,
};
```
#### 用法
```js
const long = app.lru.get('long');
long.set('test', 'aaa') ;
long.get('test');

const moment = app.lru.get('moment');
moment.set('test', 'aaa') ;
moment.get('test');
```
### 四、应用举例
基于egg框架，egg-lru配置完毕后将引入lru，挂载到app对象lru，通过app.lru来进行lru缓存读取操作操作。
#### 4.1 单队列模式举例
```js
// app/controller/home.js
module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      const { ctx, app } = this;
      // set 操作
      await app.lru.set('lru', 'bar');
      // get 操作
      ctx.body = await app.lru.get('lru');
    }
  };
};
```
#### 4.2 多队列模式举例

```js
// app/controller/home.js
// 与前文提到配置对应
module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      const { ctx, app } = this;
      // set
      await app.lru.get('long').set('foo', 'bar');
      // get
      ctx.body = await app.lru.get('moment').get('foo');
    }
  };
};
```

