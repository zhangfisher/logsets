import createLogger from "./index.js" 
import processbarPlugin from "./progressbar.plugin.js"

const logger = createLogger()
logger.use(processbarPlugin)

const progressbar = logger.progressbar({
    title:"下载进度：",
    //theme:"red"
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
logger.log("")

progressbar.begin()
progressbar.value(82)
progressbar.stop(logger.colors.red("下载停止"))
logger.log("")
 
progressbar.begin()
progressbar.value(36)
progressbar.error(logger.colors.yellow("下载失败"))
logger.log("")



logger.log("File download complate!")