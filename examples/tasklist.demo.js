const logsets = require("../src/")
 
const run = async ()=>{
    let tasks = logsets.tasklist({
        title:["所有任务:{count}个",{count:100}],
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
        {title:["下载文件：{},大小:{}, 已下载{}",["package.json",122,344]],result:"todo",note:"TODO"},

    ]
    

    for(let task of taskData){
        if(task=="-") {
            tasks.separator()
            continue
        }
        let t = tasks.add(...Array.isArray(task.title) ? task.title:[task.title])
        let n = 1
        let tm = setInterval(() => {
            t.note(`任务${n++}备注`)
        },10)
        await delay(500)
        clearInterval(tm)
        tasks[task.result](task.note)
    }
    tasks.add("正在连接")
    tasks.connected()

    // logsets.separator()
    
    // for(let task of taskData){
    //     let taskObj = tasks.add(task.title)
    //     await delay(1000)
    //     taskObj[task.result](task.note)
    // }
    
    logsets.separator()
    let task = logsets.task("正在构建文件")
    await delay(100)
    task.complete()
    task = logsets.task("1. 下载文件：{#bgCyan},大小:{}, 已下载{}",["package.json",122,344])
    await delay(1000)
    task.error("文件不存在")


    tasks.add("下载文件：{#red },大小:{}, 已下载{}",["package.json",1,2])
    tasks.complete()


    tasks.add("2. 下载文件：{#red },大小:{}, 已下载{}",["package.json",122,344])
    tasks.complete(["下载成功:{}", 1299])
    tasks.add("3. 下载文件：{#red },大小:{}, 已下载{}",["package.json",122,344])
    tasks.error()
    tasks.add("4. 下载文件：{#red },大小:{}, 已下载{}",["package.json",122,344])
    tasks.fail()
    // tasks.indent()
    tasks.add("5. 下载文件：{#red },大小:{}, 已下载{}",["package.json",122,344])
    tasks.cancel()
    tasks.add("6. 下载文件：{#red },大小:{}, 已下载{}",["package.json",122,344])
    tasks.stop()
    tasks.add("7. 下载文件：{#red },大小:{}, 已下载{}",["package.json",122,344])
    tasks.todo()
    // tasks.outdent()
    tasks.add("8. 下载文件：{#red },大小:{}, 已下载{}",["package.json",122,344])
    tasks.skip()
    tasks.add("9. 下载文件：{#red },大小:{}, 已下载{}",["package.json",122,344])
    tasks.ignore()


    task = logsets.task("10. 下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
    task.complete()
    task = logsets.task("11. 下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
    task.error()
    task = logsets.task("12. 下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
    task.fail()
    task = logsets.task("13. 下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
    task.todo()
    task = logsets.task("14. 下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
    task.skip()
    task = logsets.task("15. 下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
    task.ignore("<可选备注>")
    task = logsets.task("16. 下载文件{#yellow voerki18n.zip},大小{#red size}",{size:12354})
    task.cancel("取消")

    logsets.separator()

    await tasks.run("17. 正在下载文件{}","a.zip", ()=>{
        delay(1000)    
        return "skip"
    })

    await tasks.run("18. 正在下载文件{}","a.zip", ()=>{
        delay(1000)    
        return ["abort","用户中止"]
    })

    await tasks.run("19. 正在下载文件{}","b.zip", ()=>{
        delay(1000)   
        throw new TypeError("下载失败")
    })
    
}

run()