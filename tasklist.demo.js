import createLogger from "./index.js" 
import TaskListPlugin from "./tasklist.plugin.js"

const logger = createLogger()
logger.use(TaskListPlugin)

let tasks = logger.tasklist()

async function delay(n=10){
    return new Promise(resolve=>setTimeout(resolve,n))
}
 
const taskData = [
    {title:"开始扫描文件",result:"complete",note:"OK"},
    {title:"准备对文件进行预处理",result:"error",note:"ERROR:文件没有找到"},
    {title:"读取文件并编译成exe文件",result:"skip",note:"SKIP"},
    {title:"任务处理被停止",result:"stop",note:"STOP"},
    {title:"任务待办状态",result:"todo",note:"TODO"},
]

for(let task of taskData){
    tasks.add(task.title)
    await delay(1000)
    tasks[task.result](task.note)
}
 
// logger.separator()
 
// for(let task of taskData){
//     let taskObj = tasks.add(task.title)
//     await delay(1000)
//     taskObj[task.result](task.note)
// }
 