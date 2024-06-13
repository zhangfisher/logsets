const logsets = require("../src/")

async function delay(n=10){
    return new Promise(resolve=>setTimeout(resolve,n))
} 
(async ()=>{
const tasks = logsets.createTasks([
        {
            title:"任务处理被停止",
            execute:async ()=>{
                await delay(100)
                throw new Error("没法干了")
                return "abort"
            },
            error:"abort"
        },
        {
            title:"开始扫描文件",
            execute:async ()=>{await delay(100);return 1}            
        },
        {   title:"准备对文件进行预处理",
            execute:async ()=>{throw new Error("已安装")}, 
        },
        {   title:"准备对文件进行预处理",
            execute:async ()=>{
                await delay(100)
                return "已完成"
            }
        },
        {
            title:"读取文件并编译成exe文件",
            execute:async ()=>{
                await delay(100)
                return ['stop',"不干了"]
            }            
        },        
        {
            title:"任务处理被停止",
            execute:async ()=>{
                await delay(100)
                return ["abort",'真的不干了']
            }
        },
        "-",
        {
            title:"任务执行失败",
            execute:async ()=>{throw new Error("TimeOut")},
            error:["ignore","忽略:{message}"]
        },
        {
            title:"任务待办状态",
            execute:async ()=>{throw new Error("TimeOut")},
            error:"出错了"
        },    
        "出错处理",
        {
            title:["下载文件：{},大小:{}, 已下载{}","package.json",122,344],
            execute:async ()=>{throw new Error("TimeOut")},
            error:"出错了:{message}"
        },
        {
            title:["下载文件：{},大小:{}, 已下载{}",["package.json",122,344]],
            execute:async ()=>{throw new Error("TimeOut")},
            error:()=>"X"
        },
        {
            title:["下载文件：{},大小:{}, 已下载{}",["package.json",122,344]],
            execute:async ()=>{throw new Error("TimeOut")},
            error:()=>"skip"
        },      
    ],{ignoreErrors:false})


    try{
        let results = await tasks.run(["开始执行{}任务",5])
        console.log(results)            
    }catch(e){
        console.error(e)
    }

})()