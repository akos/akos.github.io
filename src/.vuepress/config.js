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
        sidebar: {
            '/guide/': [{
                title: '介绍',
                collapsable: false,
                children: [
                    ['what-is-akos', 'Akos 是什么？'],
                    ['akos-&-koa', 'Akos 和 Koa'],
                    ['quickstart', '快速开始'],
                ],
            }, {
                title: '基本功能',
                collapsable: false,
                children: [
                    ['structure', '目录结构'],
                    ['configuration', '配置'],
                    ['environment', '运行环境'],
                    ['router', '路由'],
                ],
            }, {
                title: '核心功能',
                collapsable: false,
                children: [
                    ['local', '本地部署'],
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
