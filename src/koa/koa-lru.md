## 基于Koa框架模板的Lru缓存，推荐使用插件lru-cache
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
npm i lru-cache --save
```
### 二、基础
#### 2.1用法
```js
var LRU = require("lru-cache")
  , options = { max: 500
              , length: function (n, key) { return n * 2 + key.length }
              , dispose: function (key, n) { n.close() }
              , maxAge: 1000 * 60 * 60 }
  , cache = new LRU(options)
  , otherCache = new LRU(50) // sets just the max size
 
cache.set("key", "value")
cache.get("key") // "value"
 
// non-string keys ARE fully supported
// but note that it must be THE SAME object, not
// just a JSON-equivalent object.
var someObject = { a: 1 }
cache.set(someObject, 'a value')
// Object keys are not toString()-ed
cache.set('[object Object]', 'a different value')
assert.equal(cache.get(someObject), 'a value')
// A similar object with same keys/values won't work,
// because it's a different object identity
assert.equal(cache.get({ a: 1 }), undefined)
 
cache.reset()    // empty the cache
```

### 三、应用举例

#### 3.1 Lru举例封装
下面使用直接lru-cache封装的方法store操作记录
```js
const LRU = require('lru-cache');
const sessionCache = new LRU({
    max: 100,
    maxAge: 1000 * 60 * 60 * 6,
});

const store = {
    get(key) {
        return sessionCache.get(key);
    },

    set(key, value) {
        return sessionCache.set(key, value);
    },

    destroy(key) {
        return sessionCache.del(key);
    },
};
```


