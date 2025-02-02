const logsets = require("../src")
 
const run = async ()=>{
    let tasks = logsets.tasklist({
        title:["所有任务:{count}个",{count:100}],
        grouped:true,
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
        "预处理阶段",
        {title:"准备对文件进行预处理",result:"error",note:new Error("文件没有找到")},
        {title:"读取文件并编译成exe文件",result:"skip",note:"SKIP"},
        "-",
        {title:"任务处理被停止",result:"stop",note:"STOP"},
        {title:"任务执行失败",result:"fail",note:"FAIL"},
        {title:"任务待办状态",result:"todo",note:"TODO"},
        "下载文件",    
        {title:["下载文件：{},大小:{}, 已下载{}","package.json",122,344],result:"todo",note:"TODO"},
        {title:["下载文件：{},大小:{}, 已下载{}",["package.json",122,344]],result:"todo",note:"TODO"},

    ]
    

    for(let task of taskData){
        if(task=="-") {
            tasks.separator()
        }else if(typeof task === "string"){
            tasks.addGroup(task)
        }else if(Array.isArray(task)){
            tasks.addGroup(...task)
        }else{
            let t = tasks.add(...Array.isArray(task.title) ? task.title:[task.title])
            let n = 1
            let tm = setInterval(() => {
                t.note(`任务${n++}备注`)
            },10)
            await delay(500)
            clearInterval(tm)
            tasks[task.result](task.note)
        }        
    } 
    
    
}

run()