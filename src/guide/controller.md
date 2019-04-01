接口层(Controller)，承载了定义接口的角色，通过对服务(Service)的组合，封装出具体的业务接口。
## 如何编写Controller
我们首先定义一个接口，如:

```js
module.exports = {
    async HelloController(ctx) {
        // 业务处理
    }
}
```
此时这个方法就是一个接口，然后我们需要在接口定义处理的功能接口。

如我们定义一个返回'hello world'
```js
module.exports = {
    async HelloController(ctx) {
      ctx.body('hello world');
    }
}
```
如需要根据传参进行区分处理，如Router层定义GET接口/hello，传入参数name（路由配置请参考Router层介绍）

```js
GET /hello 参数name
module.exports = {
    async HelloController(ctx) {
     const name = ctx.request.query.name//参考中间件bodyParsePath
      ctx.body(`hello ${name}`);
    }
}
```

如参数name为akos，则返回hello akos

## 如何结合Service


