# 快速任务列表

提供了一个快速执行任务列表的方法，可以通过`logsets.run`来执行任务列表。

`logsets.run`的参数与`createTasks`的参数一样，只是`logsets.run`会自动创建一个任务列表，然后执行。

```javascript
const logsets = require("logsets")

await logsets.run("正在下载文件",[{...},{...}])
await logsets.run(["正在下载{}文件",6],[{...},{...}]) // 标题支持插值变量着色
 

// 等效于

const tasks = logsets.createTasks([{...},{...}])
await tasks.run("正在下载文件")
await tasks.run(["正在下载{}文件",6])

```


