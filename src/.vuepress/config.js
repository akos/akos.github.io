module.exports = {
    title: 'Akos',
    themeConfig: {
        nav: [
            { text: '指南', link: '/guide/' },
            { text: 'API', link: '/api/' },
            { text: '相关教程', items: [
                    { text: 'Knex.js', link: 'https://knexjs.org' },
                    { text: 'Bookshelf.js', link: 'https://bookshelfjs.org' },
                ] },
            { text: '技术文章', link: '/articles/' },
            { text: '发布日志', link: 'https://google.com' },
            { text: '语言', items: [
                    { text: '中文', link: '/language/chinese/' },
                    { text: 'English', link: '/language/english/' },
                ] },
        ],
        sidebarDepth: 0,
        sidebar: {
            '/guide/': [{
                title: '介绍',
                collapsable: false,
                children: [
                    ['what-is-akos', 'Akos.js 是什么？'],
                    ['akos-&-koa', 'Akos.js 和 Koa'],
                    ['quickstart', '快速开始'],
                ],
            }, {
                title: '基本功能',
                collapsable: false,
                children: [
                    ['structure', '目录结构'],
                    ['configuration', '配置(Config)'],
                    ['app', '应用(App)'],
                    ['router', '路由(Router)'],
                    ['middleware', '中间件(Middleware)'],
                    ['controller', '接口(Controller)'],
                    ['model', '数据层(Model)'],
                    ['service', '服务(Service)'],
                    ['logger', '日志(Logger)'],
                    ['exception', '异常(Exception)'],
                    ['schedule', '定时机制(Schedule)'],
                    ['plugin', '插件(Plugin)'],
                ],
            }, {
                title: '拓展功能',
                collapsable: false,
                children: [
                    ['local', '服务部署'],
                    ['pm2', 'PM2使用'],
                    ['view', '模板渲染'],
                    ['ipc', 'IPC通信'],
                    ['mysql', 'MySQL操作'],
                    ['mongodb', 'mongodb操作'],
                    ['mq', 'MQ操作'],
                    ['redis', 'Redis操作'],
                    ['db-migrate', 'db-migrate操作'],
                    ['jest', 'jest单元测试'],
                    ['swagger', 'Swagger使用'],
                ],
            }, {
                title: '进阶',
                collapsable: false,
                children: [
                    ['best-practice', '最佳实践'],
                ],
            }],
            '/api/': [{
                title: 'API',
                collapsable: false,
                children: [
                    // ['local', '本地部署'],
                ],
            }],
            '/articles/': [{
                title: '技术文章',
                collapsable: false,
                children: [
                    ['basic-principle-of-nodejs', 'Node.js 的基本运行原理'],
                    ['event-loop', 'Event Loop 事件循环机制'],
                    ['what-is-nodejs', 'What is Node.js?'],
                    ['cluster-introduce', 'Cluster浅析'],
                ],
            }],
        }
    }
}
