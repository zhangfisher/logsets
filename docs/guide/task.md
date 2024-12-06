# 任务

显示正在执行的单个任务，输出效果与`tasklist`一样，差别在于`task`只显示一项任务，并且没有缩进。

```javascript
let task = logsets.task("下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
task.complete()
task = logsets.task("下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
task.error()
task = logsets.task("下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
task.fail()
task = logsets.task("下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
task.todo()
task = logsets.task("下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
task.skip()
task = logsets.task("下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
task.ignore("<可选备注>")
task = logsets.task("下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
task.cancel("取消")
// 也可以采用插值变量，对变量进行着色输出
let task = logsets.task("下载文件：{},大小:{}, 已下载{}","package.json",122,344)

```
输出效果如下:

![](./images/task.png)

