# 应用(App)
应用(App)，构建服务的角色，通过对中间件（Middleware）,定时任务（）Schedule，路由（Router）等组成部件的
装载与组合，最终得到服务应用。
## 举例说明
```js
"use strict";
require('module-alias/register');
// 将.env中配置到环境变量
require('../config');

// middleware文件夹
const handleCustomCode = require('@/plugin/handleCustomCode');
const cache = require('@/plugin/cache');
const ensureFile = require('@/plugin/ensureFile');
const bunyanLogger = require('@uronjs/bunyan-logger');
// 项目内部其他
const log = require('@/utils/logger').createLogger('app');
const downloadFileSchedule = require('@/schedule/downloadFile');
const routers = require('@/routers/index');
// 公共包
const Koa = require('koa');
const config = require('config');
const koaBody = require('koa-better-body');
const convert = require('koa-convert');
const loadMw = require('@/plugin/loadMiddlewares');
/**
 * 程序入口app，初始化插件，中间件
 * @param options
 * @returns {*}
 */
module.exports = (options) => {
    // 兼容koa1的中间件写法
    const app = new Koa();

    const _use = app.use;
    app.use = (x) => _use.call(app, convert(x));
    log.important('兼容Koa1完-convert中间件完成');

    app.keys = config.keys;

    app.on('error', (error, ctx) => {
        if (!ctx) {
            console.error('触发了koa error 事件 [无ctx] message: %s error', error.message);
        } else {
            const otherInfo = `ctx.reqId: ${ctx.reqId} originalUrl: ${ctx.originalUrl}`;
            error.message += `otherInfo: ${otherInfo}`;
            console.error('触发了koa error 事件 message: %s ', error.message);
        }
    });
    log.important('全局监听错误初始化完成');
    // 日志
    app.use(bunyanLogger({
        name: 'akos-app',
    }));
    app.use(bunyanLogger.requestIdContext());
    app.use(bunyanLogger.requestLogger());
    log.important('加载bunyanLogger初始化中间件完成');
    // 插件
    cache(app);
    ensureFile();
    // 挂载插件
    handleCustomCode(app);

    if(config.scheduleOpen){
        downloadFileSchedule.getDowoloadFile();
        log.important('定时任务加载开启');
    }

    // 正文解析初始化
    app.use(koaBody({
        multipart: true,
        keepExtensions: true,
        strict: false,

    }));
    log.important('加载正文解析初始化中间件完成');

    app.use(bunyanLogger.printKoaBetterBody());
    log.important('加载bunyanLogger优化中间件完成');

    // 插件: 加载自定义中间件 在文件uron.config.js中,配置middlewares
    loadMw(app, options);

    log.important('返回挂载方法初始化完成');
    // 业务逻辑
    // 定义code方法
    app.use(routers.routes()).use(routers.allowedMethods());
    log.important('路由初始化完成');
    return app;
};

```