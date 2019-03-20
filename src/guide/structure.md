# 目录结构
在快速构建中，大家应该初步了解框架的大致模型，接下来我们简单对目录约定规范进行说明。
::: vue
akos-project
├── package.json
├── apps.config.js (PM2启动配置，可选)
├── akos.config.js (Akos启动配置)
├── public
├── src
│   ├── client (前端目录)
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── static
│   │   ├── utils
│   │   └── views
│   ├── config (项目配置参数)
│   │   ├── default.js(默认配置)
│   │   └── index.js(入口文件)
│   ├── server (后端目录)
│   │   ├── `controller`(控制层)
│   │   ├── `middleware`(中间件)
│   │   │    └── `auth`(权限控制)
│   │   ├── `model`(数据模型层)
│   │   │    ├── db.js(连接管理)
│   │   │    └── index.js (模型关联，可拆分)
│   │   ├── `plugin`(独立插件)
│   │   ├── `schedule`(定时任务)
│   │   │      
│   │   ├── `router`(路由层)
│   │   │    └── index.js (主路由)
│   │   ├── `service`（实现层）
│   │   ├── `utils`(通用单元)
│   │   └── app.js(主入口文件)
│   └── shared (前后端共享目录)
└──test(测试目录)
:::