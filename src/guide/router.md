# Router路由

Akos框架约定src/server/router为路由层，为框架进行管理。传统的如果依靠ctx.request.url去手动处理路由，将会写很多处理代码，在此Akos引入[koa-router](https://github.com/alexmingoia/koa-router)作为框架的路由中间件。


 ## 安装koa-router中间件
```sh
# koa2 对应的版本是 8.x
npm install --save koa-router@8
```

## 快速使用koa-router
```js
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const Router = require('koa-router')

let home = new Router()

// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/home">/page/home</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
}).get('/home', async ( ctx )=>{
  ctx.body = 'home page!'
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(8000, () => {
  console.log(' Server listen on 8000')
})

```
## Akos内Router使用简要说明
Demo功能: 实在通过请求路径/page/home，获取home page资源
#### Demo目录结构
::: vue
├── src
│   ├── server (后端目录)
│   │   ├──`controller`(控制层) 
│   │   │    ├── `page`(首页) 
│   │   │    │   └── home.js 
│   │   ├──`routers`(路由层)
│   │   │    ├── index.js(主路径)
│   │   │    └── home.js(子路由)
│   │   └── app.js(项目入口)
:::
#### Controller层说明
前提：Controller层实现请求路径绑定的方法
##### src/server/controller/home/index.js
``` js
// home首页
module.exports = {
    // 获取首页
    index(ctx) {
        ctx.body = 'home page!'
    },
};

```
#### Routers层说明
##### 主路径routers/index.js中加载子路径routers/page.js，设置该子路径的父级路径为/page
##### src/server/routers/index.js
```js
const router = require('koa-router')();
const page = require('./page');// 加载子路由src/server/routers/page.js

router.use('/page', page.routes());//规定主路由为page

module.exports = router;

```
##### 子路径继承父级路径，并与Controller层的方法进行绑定
#####   src/server/routers/home.js
```js
const router = require('koa-router')();
const homeController = require('../controller/home');//加载Controller层home文件

router.get(`/home`, homeController.index);//请求路径继承父级，生成/page/home => Controller层index方法的绑定

module.exports = router;
```