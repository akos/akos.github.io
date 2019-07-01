# 定时调度任务(Schedule)
 用于系统中定时任务的调度，主要基于node-schedulej进行使用。
 比如：简单的定时任务实现
 ```js
  schedule.scheduleJob('*/5 * * * *', async () => {
            const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            try {
                // 具体任务
            } catch(error) {
                // 异常捕获处理
            }
        });
 ```
### 概述
node schedule用于基于时间的调度，而不是基于时间间隔的调度。
比如“每5分钟运行一次这个函数”，你会发现`setInterval`更容易使用，而且也更合适。
但是，如果你想要“在20：运行这个功能”。如果，你想每个月的第三个星期二每小时50个，你会发现
node schedule 更合适。
node schedule 采用Cron-style的风格。每一个scheduled的任务在Node Schedule里面都
相当于一个job。Job是一个EventEmitter对象，每次执行后都会发起run事件，同样也会抛'canceled，'
'scheduled'等事件。

### Cron-style Scheduling
The cron 的格式样式如下:
```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```
cron 格式使用举例:

```js
var schedule = require('node-schedule');

var j = schedule.scheduleJob('42 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});
```
当时刻在42分钟时，执行这个cron任务。e.g.:19:42, 20:42等等.
#### 注意，部分Corn Features不支持

目前, `W` (nearest weekday), `L` (last day of month/week), 与 `#` (nth weekday
of the month) 是不支持的.

### Date-based Scheduling

Say you very specifically want a function to execute at 5:30am on December 21, 2012.
Remember - in JavaScript - 0 - January, 11 - December.

```js
var schedule = require('node-schedule');
var date = new Date(2012, 11, 21, 5, 30, 0);

var j = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});
```

要在将来使用当前时间，您可以这样使用：
```js
var schedule = require('node-schedule');
var date = new Date(2012, 11, 21, 5, 30, 0);
var x = 'Tada!';
var j = schedule.scheduleJob(date, function(y){
  console.log(y);
}.bind(null,x));
x = 'Changing Data';
```
