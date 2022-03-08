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

for(let i = 0 ; i <= 100; i++){
    await delay()
    progressbar.value(i)
}

progressbar.end()