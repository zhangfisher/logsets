import createLogger from "./index.js" 
import TaskListPlugin from "./tasklist.plugin.js"

const logger = createLogger()
logger.use(TaskListPlugin)

let tasks = logger.tasklist({
    title:["所有任务:{}个",8],
    status:{
        connected:{
            style:"green",
            symbol:"C",
            note:"连接成功"
        }
    }
})

async function delay(n=10){
    return new Promise(resolve=>setTimeout(resolve,n))
}
 
const taskData = [
    {title:"开始扫描文件",result:"complete",note:"OK"},
    {title:"准备对文件进行预处理",result:"error",note:"ERROR:文件没有找到"},
    {title:"读取文件并编译成exe文件",result:"skip",note:"SKIP"},
    {title:"任务处理被停止",result:"stop",note:"STOP"},
    {title:"任务待办状态",result:"todo",note:"TODO"},
    {title:["下载文件：{},大小:{}, 已下载{}","package.json",122,344],result:"todo",note:"TODO"},
]

for(let task of taskData){
    tasks.add(task.title)
    await delay(1000)
    tasks[task.result](task.note)
}
tasks.add("正在连接")
tasks.connected()

// logger.separator()
 
// for(let task of taskData){
//     let taskObj = tasks.add(task.title)
//     await delay(1000)
//     taskObj[task.result](task.note)
// }
 


const tree = {
    "arrays.js": {
      lasModifyTime: 1650854060803,
      buildTime: 1650873807693,
    },
    "asyncSignal.js": {
      lasModifyTime: 1642384454095,
      buildTime: 1650873808220,
    },
    "asyncStateMachine.js": {
      lasModifyTime: 1650853827230,
      buildTime: 1650873808755,
    },
    "buffers.js": {
      lasModifyTime: 1642384454370,
      buildTime: 1650873809044,
    },
    "classes.js": {
      lasModifyTime: 1650447265223,
      buildTime: 1650873809255,
    },
    "dataConsumer.js": {
      lasModifyTime: 1650867353119,
      buildTime: 1650873809564,
    },
    "dataqueue.js": {
      lasModifyTime: 1642384454530,
      buildTime: 1650873809748,
    },
    "deviceInfo.android.js": {
      lasModifyTime: 1642384454604,
      buildTime: 1650873809863,
    },
    "deviceInfo.js": {
      lasModifyTime: 1642384454677,
      buildTime: 1650873810012,
    },
    "dicts.js": {
      lasModifyTime: 1650356961062,
      buildTime: 1650873810283,
    },
    "enum.js": {
      lasModifyTime: 1642384454844,
      buildTime: 1650873810388,
    },
    "envs.js": {
      lasModifyTime: 1650773039369,
      buildTime: 1650873810475,
    },
    "flexArgs.js": {
      lasModifyTime: 1642384454943,
      buildTime: 1650873810566,
    },
    "funcs.js": {
      lasModifyTime: 1650854008034,
      buildTime: 1650873810714,
    },
    "hook.js": {
      lasModifyTime: 1642384455098,
      buildTime: 1650873810784,
    },
    "index.js": {
      lasModifyTime: 1642384455158,
      buildTime: 1650873810863,
    },
    "iterator.js": {
      lasModifyTime: 1642384455319,
      buildTime: 1650873810925,
    },
    "multiplex.js": {
      lasModifyTime: 1650854079018,
      buildTime: 1650873811116,
    },
    "schema.js": {
      lasModifyTime: 1642384455695,
      buildTime: 1650873811207,
    },
    "session.js": {
      lasModifyTime: 1642384455761,
      buildTime: 1650873811350,
    },
    "snowflake.js": {
      lasModifyTime: 1642384455818,
      buildTime: 1650873811412,
    },
    "statedPromise.js": {
      lasModifyTime: 1642384455884,
      buildTime: 1650873811512,
    },
    "timer.js": {
      lasModifyTime: 1650436530905,
      buildTime: 1650873811601,
    },
    "tree.js": {
      lasModifyTime: 1642384456218,
      buildTime: 1650873811706,
    },
    "typeCheck.js": {
      lasModifyTime: 1650856845095,
      buildTime: 1650873811785,
    },
    "a\\index.js": {
      lasModifyTime: 1650856983600,
      buildTime: 1650873811865,
    },
  }


logger.format(tree)