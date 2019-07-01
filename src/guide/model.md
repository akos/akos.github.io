# 数据层（Model）
Akos框架约定数据模型放置在/server/model目录下,数据层(Model)承载着数据模型与数据库真实表的映射关系。同时，可以结合实现业务需求定制业务模型，可
不局限于数据表真实架构进行设计
## 举例如下:
```js
'use strict';

const config = require('config');
const logger = require('@/utils/logger');

const log = logger.createLogger('myRn:src:server:model:db');
const dbConfig = config.db;
// db
/**
 * 数据库连接
 */
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: dbConfig.host,
        database: dbConfig.database,
        user: dbConfig.user,
        password: dbConfig.password,
        charset: 'utf8',
    },
    pool: {
        min: 0,
        max: dbConfig.poolSize || 10,
    },
    debug: true,
});

log.info(`数据库连接：connect to ${dbConfig.host}#${dbConfig.database}`);

const db = require('bookshelf')(knex);
db.plugin('pagination');
db.plugin('registry');

module.exports = {
    db,
    knex
};

```
