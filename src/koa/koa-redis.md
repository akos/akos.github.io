## 基于Koa框架模板的redis，推荐使用插件ioredis
## 前言
---
> Redis是一个开源的使用ANSIC语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库。
Redis单线程服务，采用IO多路复用，以队列的模式对redis操作进行处理，内置连接处理寄存器，命令接收寄存器，命令响应寄存器，可处理百万级Qps。相比MemCache类型更为丰富，有string，hash，list，set，sort set等。目前，Redis是大部分程序员的首选缓存。
--- 

## 一、Install
ioredis更多说明，请参看[官方文档](https://www.npmjs.com/package/ioredis)
```
npm i ioredis --save
```
## 二、基础
#### 2.1用法
```js
var Redis = require("ioredis");
var redis = new Redis();

redis.set("foo", "bar");
redis.get("foo", function(err, result) {
  console.log(result);
});
redis.del("foo");

// Or using a promise if the last argument isn't a function
redis.get("foo").then(function(result) {
  console.log(result);
});

// Arguments to commands are flattened, so the following are the same:
redis.sadd("set", 1, 3, 5, 7);
redis.sadd("set", [1, 3, 5, 7]);

// All arguments are passed directly to the redis server:
redis.set("key", 100, "EX", 10);
```
#### 2.2Redis连接
```js
new Redis(); // Connect to 127.0.0.1:6379
new Redis(6380); // 127.0.0.1:6380
new Redis(6379, "192.168.1.1"); // 192.168.1.1:6379
new Redis("/tmp/redis.sock");
new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: "auth",
  db: 0
});
```


## 三、应用举例
基于koa框架，redis配置需要写入config/default.js下(环境区分，参考配置章节)，可增加akos-redis插件或自行封装，将redis挂载到app对象redis，通过app.redis来进行redis操作。

#### 3.1 Redis配置设置
```js
// 在config/default.js增加redis服务配置
config.redis = {
  client: {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    password: 'auth',
    db: 0,
  },
}
```
#### 3.2 单服务模式举例
```js
// app/controller/home.js
module.exports = {
      async index() {
      const { ctx, app } = this;
      // set
      await app.redis.get('instance1').set('foo', 'bar');
      // get
      ctx.body = await app.redis.get('instance1').get('foo');
    }
}
```

