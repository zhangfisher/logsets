 
/**
import createLogger from "coloredLogger"
import progressbar from "logsets/plugins/progressbar"" 
const logger = createLogger({...})
logger.use(progressbar)

const progressbar = logger.progressbar({
    type: 0 ,               // normal,infinite ,greedySnake 
    max: 100,
    min: 0,
    dispaly:"",             // none, value, percent, text 
    width: 80,
})

progressbar.next(1)    == 向前移动指定值
progressbar.begin()
progressbar.value()
progressbar.end()


 */

import deepmerge from 'deepmerge'

// 预设的主题样式
const PresetThemes = {
    default:["bgWhite","bgDarkGray"],
    red:["bgRed","bgDarkGray"],
}

const DefaultProgressbarOptions  = { 
    title     : "",       // 显示标题
    theme     : "",       // 一些预设好的主题配色,
    type      : "normal", // normal,infinite ,greedySnake
    max       : 100,      // 当type     = normal时,最大值
    min       : 0,        // 当type     = normal时,最小值
    value     : 0,        // 当前值   
    dispaly   : "{percent}%", // 模板字符串,支持插值变量{value} {percent} {max} {min}
    width     : 60,       // 进度条宽度
    showMax   : "none",   // 显示最大值 none = 不显示, value = 显示值, percent = 显示百分比
    showMin   : "none",   // 显示最小值 none = 不显示, value = 显示值, percent = 显示百分比
    alive     : true,     // 活跃提示
    background: {         // 进度条样式
        show  : true,     // 是否显示背景，默认显示，不显示时只显示进度条滑块
        style : "bgDarkGray",       // 进度条样式
        char  : " "
    },       
    slider    : {         // 滑块字符
        style : "bgWhite",       // 进度条样式
        char  : " ",
        speed : 100,      // 当type     = infinite时滑块移动速度
        size  : 4,        // 当type     = infinite时滑块大小
    },
    status:{   
        stop:{
            style:"",
            char:"✋",
        },
        complete:{
            style:"",
            char:"✔️"
        },
        error:{
            style:"",
            char:"❌",            
        }
    }  
}


function getPercent(value,max){
    return Math.round(value/max*10000)/100
}

const ProgressbarTypes =["normal","infinite","greedySnake"]

function createProgressbar(context,options){
    const logger = this 
    let themeStyle = {},opts={} 

    if(options.theme in PresetThemes){
        themeStyle = {
            slider:{style:PresetThemes[options.theme][0]},
            background:{style:PresetThemes[options.theme][1]}
        }
    }
    opts = deepmerge(DefaultProgressbarOptions,themeStyle)
    opts = deepmerge(opts,options)

    let silder = opts.slider
    
    
    const sliderColorizer = logger.getColorizer(opts.slider.style)
    const bgColorizer = logger.getColorizer(opts.background.style)


    // 绘制背景
    function drawBackground(){
        let {width,background} = opts
        let {show,style,char} = background
        if(!show) return ""
        let colorizer = logger.getColorizeFunction
        return new Array(opts.width).fill(opts.background.char).join("")
    }
    // 常规进度条，进度由value,min,max控制
    function renderProgressbar(value,{status}={}){  
        opts.value = value
        // 计算滑块大小，当value>min时显示为1，当value<max时显示为width-1
        let sliderLenght = parseInt(value/(opts.max-opts.min) * opts.width)
        if(value > opts.min && value === sliderLenght) sliderLenght = 1
        if(value == opts.max && opts.max  === sliderLenght ) sliderLenght = opts.width - 1
        let slider =new Array(sliderLenght).fill(opts.slider.char).join("")
        // 背景条
        let bg =new Array(opts.width - sliderLenght).fill(opts.background.char).join("")
        let emptyBg = new Array(opts.width).fill(opts.background.char).join("")

        // 显示文本
        let statusText = ""
        if(status && status in opts.status){
            const state = opts.status[status]
            statusText = logger.getColorizer(state.style)(state.char)
        }else{
            statusText = opts.dispaly.params({value,percent:getPercent(value,opts.max),max:opts.max,min:opts.min})
        } 
        // 清除进度条
        logger.print(`${opts.title}${bgColorizer(emptyBg)} ${statusText}`,{end:"\r"})
        // 绘制进度条
        logger.print(`${opts.title}${sliderColorizer(slider)}${bgColorizer(bg)} ${statusText}`,{end:"\r"})
    }
    function hideCursor(){
        process.stdout.write(`${"\x1b"}[?25l`) 
    }
    function showCursor(){
        process.stdout.write(`${"\x1b"}[?25h`) 
    }

    return {
        begin(){
            hideCursor()
        },
        value(n){          
            if(n>opts.max) n = opts.max
            if(n<opts.min) n = opts.min
            if(n===opts.max) {
                return this.end()
            }else{
                renderProgressbar(n)      
            }
        },
        end(){          
            renderProgressbar(opts.max,{status:"complete"})  
            showCursor()
            process.stdout.write("\n") 
        }, 
        stop(n){            
            if(!n) n = opts.value 
            renderProgressbar(n,{status:"stop"})  
            showCursor()
            process.stdout.write("\n") 
        },
        error(n){           
            if(!n) n = opts.value 
            renderProgressbar(n,{status:"error"})  
            showCursor()
            process.stdout.write("\n") 
        }
    }
}
/**
 * 
 * @param {*} log 
 * @param {*} context  当前表格的上下文配置参数
 */
 export default function(logger,context){
    logger.progressbar = (opts)=>createProgressbar.call(logger,context,opts)
}
 