const logsets = require("../src")  

const run = async ()=>{
    const progressbar = logsets.progressbar({
        title:"下载进度：",
        slider:{
            style:"bgDarkGray,red",
            char:"="
        }
    })

    async function delay(n=10){
        return new Promise(resolve=>setTimeout(resolve,n))
    }
    progressbar.begin()
    for(let i = 0 ; i <= 60; i++){
        await delay()
        progressbar.value(i)
    }
    progressbar.end()
    logsets.log("")

    progressbar.begin()
    progressbar.value(82)
    progressbar.stop(logsets.colors.red("下载停止"))
    logsets.log("")
    
    progressbar.begin()
    progressbar.value(36)
    progressbar.error(logsets.colors.yellow("下载失败"))
    logsets.log("")



    logsets.log("File download complate!")

}

run()