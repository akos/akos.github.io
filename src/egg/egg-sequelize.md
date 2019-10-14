## 基于Egg框架模板的sequelize，推荐使用插件egg-sequelize
### 前言

---
> Sequelize是一个基于promise的关系型数据库Node.js ORM框架,当前支持MySQL、SQLite、PostgreSQL、Sql Server等数据库,它具有可靠的事务支持，关系，读取复制等功能
---

### 一、Install

```
$ npm i --save egg-sequelize
$ npm install --save mysql2 # For both mysql and mariadb dialects

# Or use other database backend.
$ npm install --save pg pg-hstore # PostgreSQL
$ npm install --save tedious # MSSQ

```
### 二、Configuration
### 插件引入
```js
// config/plugin.js文件中增加插件引入
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}
```

### sequelize配置设置
#### 单客户端模式
```js
// 在config/config.default.js增加redis服务配置
exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  database: 'test',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
  // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
  // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
  // more sequelize options
};
或
exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  connectionUri: 'mysql://root:@127.0.0.1:3306/test',
  // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
  // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
  // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
  // more sequelize options
};
```
#### 多客户端模式
```js
// config/config.default.js
exports.sequelize = {
  datasources: [
    {
      delegate: 'model', // load all models to app.model and ctx.model
      baseDir: 'model', // load models from `app/model/*.js`
      database: 'biz',
      // other sequelize configurations
    },
    {
      delegate: 'admninModel', // load all models to app.adminModel and ctx.adminModel
      baseDir: 'admin_model', // load models from `app/admin_model/*.js`
      database: 'admin',
      // other sequelize configurations
    },
  ],
};
```

```
### 三、应用举例
基于egg框架，egg-redis配置完毕后将引入redis，挂载到app对象redis，通过app.redis来进行redis操作。
#### 单服务模式举例
```js
// app/model/post.js

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Post = app.model.define('Post', {
    name: STRING(30),
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  Post.associate = function() {
    app.model.Post.belongsTo(app.model.User, { as: 'user' });
  }

  return Post;
};
```

```js
// app/controller/post.js
class PostController extends Controller {
  async index() {
    const posts = await this.ctx.model.Post.findAll({
      attributes: [ 'id', 'user_id' ],
      include: { model: this.ctx.model.User, as: 'user' },
      where: { status: 'publish' },
      order: 'id desc',
    });

    this.ctx.body = posts;
  }

  async show() {
    const post = await this.ctx.model.Post.findByPk(this.params.id);
    const user = await post.getUser();
    post.setDataValue('user', user);
    this.ctx.body = post;
  }

  async destroy() {
    const post = await this.ctx.model.Post.findByPk(this.params.id);
    await post.destroy();
    this.ctx.body = { success: true };
  }
}
```

