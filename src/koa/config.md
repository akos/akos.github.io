# 配置(Config)

Akos框架约定配置文件放置在/config目录下，主要采用dotenv进行封装。
## 举例如下
```js
const result = require('dotenv').config();

if (result.error) { throw new Error(result.error, 'dotevn parse error'); } else { console.info('dotevn parsed envs:  %O', result.parsed); }
process.env.HOSTNAME = result.parsed.HOSTNAME;

const config = require('config');
console.log('HOSTNAME: %s', config.util.getEnv('HOSTNAME'));
console.log('config %O', config);

module.exports = config;
```

# dotenv介绍

## Install

```bash
# with npm
npm install dotenv

# or with Yarn
yarn add dotenv
```

## Usage

As early as possible in your application, require and configure dotenv.

```javascript
require('dotenv').config()
```

Create a `.env` file in the root directory of your project. Add
environment-specific variables on new lines in the form of `NAME=VALUE`.
For example:

```dosini
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

`process.env` now has the keys and values you defined in your `.env` file.

```javascript
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
```

### Preload

You can use the `--require` (`-r`) [command line option](https://nodejs.org/api/cli.html#cli_r_require_module) to preload dotenv. By doing this, you do not need to require and load dotenv in your application code. This is the preferred approach when using `import` instead of `require`.

```bash
$ node -r dotenv/config your_script.js
```

The configuration options below are supported as command line arguments in the format `dotenv_config_<option>=value`

```bash
$ node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/your/env/vars
```

Additionally, you can use environment variables to set configuration options. Command line arguments will precede these.

```bash
$ DOTENV_CONFIG_<OPTION>=value node -r dotenv/config your_script.js
```

```bash
$ DOTENV_CONFIG_ENCODING=latin1 node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env
```

## Config

`config` will read your `.env` file, parse the contents, assign it to
[`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env),
and return an Object with a `parsed` key containing the loaded content or an `error` key if it failed.

```js
const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)
```

You can additionally, pass options to `config`.

### Options

#### Path

Default: `path.resolve(process.cwd(), '.env')`

You may specify a custom path if your file containing environment variables is located elsewhere.

```js
require('dotenv').config({ path: '/full/custom/path/to/your/env/vars' })
```

#### Encoding

Default: `utf8`

You may specify the encoding of your file containing environment variables.

```js
require('dotenv').config({ encoding: 'latin1' })
```

#### Debug

Default: `false`

You may turn on logging to help debug why certain keys or values are not being set as you expect.

```js
require('dotenv').config({ debug: process.env.DEBUG })
```

## Parse

The engine which parses the contents of your file containing environment
variables is available to use. It accepts a String or Buffer and will return
an Object with the parsed keys and values.

```js
const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // will return an object
console.log(typeof config, config) // object { BASIC : 'basic' }
```

### Options

#### Debug

Default: `false`

You may turn on logging to help debug why certain keys or values are not being set as you expect.

```js
const dotenv = require('dotenv')
const buf = Buffer.from('hello world')
const opt = { debug: true }
const config = dotenv.parse(buf, opt)
// expect a debug message because the buffer is not in KEY=VAL form
```

### Rules

The parsing engine currently supports the following rules:

- `BASIC=basic` becomes `{BASIC: 'basic'}`
- empty lines are skipped
- lines beginning with `#` are treated as comments
- empty values become empty strings (`EMPTY=` becomes `{EMPTY: ''}`)
- inner quotes are maintained (think JSON) (`JSON={"foo": "bar"}` becomes `{JSON:"{\"foo\": \"bar\"}"`)
- whitespace is removed from both ends of unquoted values (see more on [`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)) (`FOO=  some value  ` becomes `{FOO: 'some value'}`)
- single and double quoted values are escaped (`SINGLE_QUOTE='quoted'` becomes `{SINGLE_QUOTE: "quoted"}`)
- single and double quoted values maintain whitespace from both ends (`FOO="  some value  "` becomes `{FOO: '  some value  '}`)
- double quoted values expand new lines (`MULTILINE="new\nline"` becomes

```
{MULTILINE: 'new
line'}
```
