import logger from "./index.js"  
 

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
    "-",
    {title:"任务处理被停止",result:"stop",note:"STOP"},
    {title:"任务执行失败",result:"fail",note:"FAIL"},
    {title:"任务待办状态",result:"todo",note:"TODO"},    
    {title:["下载文件：{},大小:{}, 已下载{}","package.json",122,344],result:"todo",note:"TODO"},
]

for(let task of taskData){
    if(task=="-") {
        tasks.separator()
        continue
    }
    let t = tasks.add(...Array.isArray(task.title) ? task.title:[task.title])
    let n = 1
    let tm = setInterval(() => t.note(`任务备注${n++}`),10)
    await delay(1000)
    clearInterval(tm)
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
logger.separator()
let task = logger.task("正在构建文件")
await delay(1000)
task.complete()
task = logger.task("下载文件：{},大小:{}, 已下载{}","package.json",122,344)
await delay(1000)
task.error("文件不存在")
