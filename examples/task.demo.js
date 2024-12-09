const logsets = require("../src")


async function delay(n = 100) {
	return new Promise((resolve) => setTimeout(resolve, n));
}

async function run(){    
    await logsets.task("正常执行任务",async ()=>{
        await delay(1000)        
    })
    await logsets.task("正常任务出错",async ()=>{
        await delay(1000)        
        throw new Error("任务出错")
    })
    await logsets.task("正常任务跳过",async ()=>{
        await delay(1000)        
        return "skip"
    })
    await logsets.task("正常任务取消",async ()=>{
        await delay(1000)        
        return "cancel"
    })
    await logsets.task("正常任务停止",async ()=>{
        await delay(1000)        
        return ["stop","任务停止"]
    })
    await logsets.task(["正常执行任务:{}","voerkai18n"],async ()=>{
        await delay(1000)        
    })
    await logsets.task(["正常执行任务:{}","voerkai18n"],async (task)=>{
        await delay(1000)        
        for(let i=0;i<10;i++){
            task.note(i+1)
            await delay(100)
        }
    })
}

run()