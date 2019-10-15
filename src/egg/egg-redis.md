## 基于Egg框架模板的redis，推荐使用插件egg-redis
## 前言

---
> Redis是一个开源的使用ANSIC语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库。
Redis单线程服务，采用IO多路复用，以队列的模式对redis操作进行处理，内置连接处理寄存器，命令接收寄存器，命令响应寄存器，可处理百万级Qps。相比MemCache类型更为丰富，有string，hash，list，set，sort set等。目前，Redis是大部分程序员的首选缓存。
---

## 一、Install

```
npm i egg-redis --save
```
## 二、Configuration
#### 插件引入
```js
// config/plugin.js文件中增加插件引入
exports.redis = {
  enable: true,
  package: 'egg-redis',
};
```

## 三、Redis配置设置
#### 3.1单客户端模式
```js
// 在config/config.default.js增加redis服务配置
config.redis = {
  client: {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    password: 'auth',
    db: 0,
  },
}
```
#### 3.2多客户端模式
```js
config.redis = {
  clients: {
    foo: {                 // instanceName. See below
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: 'auth',
      db: 0,
    },
    bar: {
      port: 6379,
      host: '127.0.0.1',
      password: 'auth',
      db: 1,
    },
  }
}
```
#### 3.3Sentinel哨兵模式

```js
config.redis = {
  client: {
    sentinels: [{          // Sentinel instances
      port: 26379,         // Sentinel port
      host: '127.0.0.1',   // Sentinel host
    }],
    name: 'mymaster',      // Master name
    password: 'auth',
    db: 0
  },
}
```
## 四、应用举例
基于egg框架，egg-redis配置完毕后将引入redis，挂载到app对象redis，通过app.redis来进行redis操作。
#### 4.1单服务模式举例
```js
// app/controller/home.js
module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      const { ctx, app } = this;
      // set 操作
      await app.redis.set('foo', 'bar');
      // get 操作
      ctx.body = await app.redis.get('foo');
    }
  };
};
```
#### 4.2多服务模式举例

```js
// app/controller/home.js
module.exports = app => {
  return class HomeController extends app.Controller {
    async index() {
      const { ctx, app } = this;
      // set
      await app.redis.get('instance1').set('foo', 'bar');
      // get
      ctx.body = await app.redis.get('instance1').get('foo');
    }
  };
};
```

