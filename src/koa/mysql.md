# 数据库(Mysql)
数据库使用主要采用bookshelf.js, sequelize.js。

## bookshelf.js
# bookshelf.js
Bookshelf is a JavaScript ORM for Node.js, built on the [Knex](http://knexjs.org) SQL query builder. It features both Promise-based and traditional callback interfaces, transaction support, eager/nested-eager relation loading, polymorphic associations, and support for one-to-one, one-to-many, and many-to-many relations.

It is designed to work with PostgreSQL, MySQL, and SQLite3.

[Website and documentation](http://bookshelfjs.org). The project is [hosted on GitHub](http://github.com/bookshelf/bookshelf/), and has a comprehensive [test suite](https://travis-ci.org/bookshelf/bookshelf).

## Introduction

Bookshelf aims to provide a simple library for common tasks when querying databases in JavaScript, and forming relations between these objects, taking a lot of ideas from the the [Data Mapper Pattern](http://en.wikipedia.org/wiki/Data_mapper_pattern).

With a concise, literate codebase, Bookshelf is simple to read, understand, and extend. It doesn't force you to use any specific validation scheme, and provides flexible, efficient relation/nested-relation loading and first-class transaction support.

It's a lean object-relational mapper, allowing you to drop down to the raw Knex interface whenever you need a custom query that doesn't quite fit with the stock conventions.

## Installation

You'll need to install a copy of [Knex](http://knexjs.org/), and either `mysql`, `pg`, or `sqlite3` from npm.

```js
$ npm install knex --save
$ npm install bookshelf --save

# Then add one of the following:
$ npm install pg
$ npm install mysql
$ npm install mariasql
$ npm install sqlite3
```

The Bookshelf library is initialized by passing an initialized [Knex](http://knexjs.org/) client instance. The [Knex documentation](http://knexjs.org/) provides a number of examples for different databases.

```js
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'
});
```

This initialization should likely only ever happen once in your application. As it creates a connection pool for the current database, you should use the `bookshelf` instance returned throughout your library. You'll need to store this instance created by the initialize somewhere in the application so you can reference it. A common pattern to follow is to initialize the client in a module so you can easily reference it later:

```js
// In a file named something like bookshelf.js
var knex = require('knex')(dbConfig);
module.exports = require('bookshelf')(knex);

// elsewhere, to use the bookshelf client:
var bookshelf = require('./bookshelf');

var Post = bookshelf.Model.extend({
  // ...
});
```

## Examples

Here is an example to get you started:

```js
var knex = require('knex')({
  client: 'mysql',
  connection: process.env.MYSQL_DATABASE_CONNECTION
});
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users',
  posts: function() {
    return this.hasMany(Posts);
  }
});

var Posts = bookshelf.Model.extend({
  tableName: 'messages',
  tags: function() {
    return this.belongsToMany(Tag);
  }
});

var Tag = bookshelf.Model.extend({
  tableName: 'tags'
})

User.where('id', 1).fetch({withRelated: ['posts.tags']}).then(function(user) {
  console.log(user.related('posts').toJSON());
}).catch(function(err) {
  console.error(err);
});
```

## Plugins

* [Registry](https://github.com/bookshelf/bookshelf/wiki/Plugin:-Model-Registry): Register models in a central location so that you can refer to them using a string in relations instead of having to require it every time. Helps deal with the challenges of circular module dependencies in Node.
* [Virtuals](https://github.com/bookshelf/bookshelf/wiki/Plugin:-Virtuals): Define virtual properties on your model to compute new values.
* [Visibility](https://github.com/bookshelf/bookshelf/wiki/Plugin:-Visibility): Specify a whitelist/blacklist of model attributes when serialized toJSON.
* [Pagination](https://github.com/bookshelf/bookshelf/wiki/Plugin:-Pagination): Adds `fetchPage` methods to use for pagination in place of `fetch` and `fetchAll`.
* [Case Converter](https://github.com/bookshelf/bookshelf/wiki/Plugin:-Case-Converter): Handles the conversion between the database's snake_cased and a model's camelCased properties automatically.
* [Processor](https://github.com/bookshelf/bookshelf/wiki/Plugin:-Processor): Allows defining custom processor functions that handle transformation of values whenever they are `.set()` on a model.

## Community plugins

* [bookshelf-cascade-delete](https://github.com/seegno/bookshelf-cascade-delete) - Cascade delete related models on destroy.
* [bookshelf-json-columns](https://github.com/seegno/bookshelf-json-columns) - Parse and stringify JSON columns on save and fetch instead of manually define hooks for each model (PostgreSQL and SQLite).
* [bookshelf-mask](https://github.com/seegno/bookshelf-mask) - Similar to [Visibility](https://github.com/bookshelf/bookshelf/wiki/Plugin:-Visibility) but supporting multiple scopes, masking models and collections using the [json-mask](https://github.com/nemtsov/json-mask) API.
* [bookshelf-schema](https://github.com/bogus34/bookshelf-schema) - A plugin for handling fields, relations, scopes and more.
* [bookshelf-signals](https://github.com/bogus34/bookshelf-signals) - A plugin that translates Bookshelf events to a central hub.
* [bookshelf-paranoia](https://github.com/estate/bookshelf-paranoia) - Protect your database from data loss by soft deleting your rows.
* [bookshelf-uuid](https://github.com/estate/bookshelf-uuid) - Automatically generates UUIDs for your models.
* [bookshelf-modelbase](https://github.com/bsiddiqui/bookshelf-modelbase) - An alternative to extend `Model`, adding timestamps, attribute validation and some native CRUD methods.
* [bookshelf-advanced-serialization](https://github.com/sequiturs/bookshelf-advanced-serialization) - A more powerful visibility plugin, supporting serializing models and collections according to access permissions, application context, and after ensuring relations have been loaded.
* [bookshelf-plugin-mode](https://github.com/popodidi/bookshelf-plugin-mode) - Plugin inspired by [Visibility](https://github.com/tgriesser/bookshelf/wiki/Plugin:-Visibility) plugin, providing functionality to specify different modes with corresponding visible/hidden fields of model.
* [bookshelf-secure-password](https://github.com/venables/bookshelf-secure-password) - A plugin for easily securing passwords using bcrypt.
* [bookshelf-default-select](https://github.com/DJAndries/bookshelf-default-select) - Enables default column selection for models. Inspired by [Visibility](https://github.com/tgriesser/bookshelf/wiki/Plugin:-Visibility), but operates on the database level.
* [bookshelf-ez-fetch](https://github.com/DJAndries/bookshelf-ez-fetch) - Convenient fetching methods which allow for compact filtering, relation selection and error handling.
* [bookshelf-manager](https://github.com/ericclemmons/bookshelf-manager) - Model & Collection manager to make it easy to create & save deep, nested JSON structures from API requests.

## Sequelize

Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

Sequelize follows [SEMVER](http://semver.org). Supports Node v6 and above to use ES6 features.

New to Sequelize? Take a look at the [Tutorials and Guides](http://docs.sequelizejs.com/). You might also be interested in the [API Reference](http://docs.sequelizejs.com/identifiers).

## v5 Release

You can find the upgrade guide and changelog [here](http://docs.sequelizejs.com/manual/upgrade-to-v5.html).

## Table of Contents
- [Installation](#installation)
- [Documentation](#documentation)
- [Responsible disclosure](#responsible-disclosure)
- [Resources](#resources)

## Installation

```bash
$ npm install --save sequelize # This will install v5

# And one of the following:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
```

## Documentation
- [v5 Documentation](http://docs.sequelizejs.com)
- [v4 Documentation](https://github.com/sequelize/sequelize/blob/v4/docs)
- [v3 Documentation](https://sequelize.readthedocs.io/en/v3/)
- [Contributing](https://github.com/sequelize/sequelize/blob/master/CONTRIBUTING.md)

## Responsible disclosure
If you have any security issue to report, contact project maintainers privately. You can find contact information in [CONTACT.md](https://github.com/sequelize/sequelize/blob/master/CONTACT.md).

## Resources

- [Changelog](https://github.com/sequelize/sequelize/releases)
- [Slack](http://sequelize-slack.herokuapp.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/sequelize.js)

### Tools
- [Sequelize & TypeScript](http://docs.sequelizejs.com/manual/typescript.html)
- [Enhanced TypeScript with decorators](https://github.com/RobinBuschmann/sequelize-typescript)
- [Sequelize & GraphQL](https://github.com/mickhansen/graphql-sequelize)
- [Add-ons & Plugins](http://docs.sequelizejs.com/manual/resources.html)
- [Sequelize CLI](https://github.com/sequelize/cli)

### Learning
- [Getting Started](http://docs.sequelizejs.com/manual/getting-started)
- [Express Example](https://github.com/sequelize/express-example)

### Translations
- [English v5](http://docs.sequelizejs.com) (OFFICIAL)
- [中文文档 v4/v5](https://github.com/demopark/sequelize-docs-Zh-CN) (UNOFFICIAL)
