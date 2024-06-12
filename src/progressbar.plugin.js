 
/**
import createLogger from "coloredLogger"
import progressbar from "logsets/plugins/progressbar"" 
const logger = createLogger({...})
logger.use(progressbar)

const progressbar = logger.progressbar({
    max: 100,
    min: 0,
    dispaly:"",             // 显
    width: 80,
})

progressbar.next(1)    == 向前移动指定值
progressbar.begin()
progressbar.value()
progressbar.end()
"✋✔️❌

 */

import { deepMerge } from 'flex-tools/object/deepMerge'
import { hideCursor,showCursor,consoleOutput } from './utils.js'

// 预设的主题样式
const PresetThemes = {
    default:["bgWhite","bgDarkGray"],
    red:["bgRed","bgDarkGray"],
    green:["bgGreen","bgDarkGray"],    
    blue:["bgBlue","bgDarkGray"],
    yellow:["bgYellow","bgDarkGray"],
    magenta:["bgMagenta","bgDarkGray"],
    cyan:["bgCyan","bgDarkGray"] 
}

const DefaultProgressbarOptions  = { 
    title     : "",                 // 显示标题
    theme     : undefined,          // 一些预设好的主题配色,
    max       : 100,                // 最大值
    min       : 0,                  // 最小值
    value     : 0,                  // 当前值   
    dispaly   : "{percent}%",       // 备注字符串,支持插值变量{value} {percent} {max} {min}
    width     : 60,                 // 进度条宽度 
    background: {                   // 进度条样式
        show  : true,               // 是否显示背景，默认显示，不显示时只显示进度条滑块
        style : "bgDarkGray",       // 进度条样式
        char  : " "
    },       
    slider    : {         // 滑块字符
        style : "bgWhite",       // 进度条样式
        char  : " ", 
    } 
}


function getPercent(value,max){
    return Math.round(value/max*10000)/100
}

function createProgressbar(context,options){
    const logger = this 
    let themeStyle = {},opts={} 

    if(options.theme in PresetThemes){
        themeStyle = {
            slider:{style:PresetThemes[options.theme][0]},
            background:{style:PresetThemes[options.theme][1]}
        }
    }
    opts = deepMerge(DefaultProgressbarOptions,themeStyle)
    opts = deepMerge(opts,options)
    
    const sliderColorizer = logger.getColorizer(opts.slider.style)
    const bgColorizer = logger.getColorizer(opts.background.style)
    
    // 常规进度条，进度由value,min,max控制
    function renderProgressbar(value,note){  
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
        let noteText = ""
        if(note){
            noteText = note
        }else{
            noteText = opts.dispaly.params({value,percent:getPercent(value,opts.max),max:opts.max,min:opts.min})
        } 
        // 清除进度条
        logger.print(`${opts.title}${bgColorizer(emptyBg)} ${noteText}`,{end:"\r"})
        // 绘制进度条
        logger.print(`${opts.title}${sliderColorizer(slider)}${bgColorizer(bg)} ${noteText}`,{end:"\r"})
    } 

    return {
        begin(){
            hideCursor()
            opts.value = opts.min
        },
        value(n){          
            if(n>opts.max) n = opts.max
            if(n<opts.min) n = opts.min
            if(n===opts.max) {
                this.end()
            }else{
                renderProgressbar(n)      
            }
        },
        end(note){          
            renderProgressbar(opts.max,note)  
            showCursor()
            process.stdout.write("\n") 
        }, 
        stop(note){             
            renderProgressbar(opts.value ,note)  
            showCursor()
            process.stdout.write("\n") 
        },
        error(note){           
            renderProgressbar(opts.value,note)  
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
    logger.progressbar = (opts={})=>createProgressbar.call(logger,context,opts)
}
 