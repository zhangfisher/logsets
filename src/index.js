import "flex-tools/string/index.js"
import colorize, { getColorizeFunction,colorizeString } from './colorize.js'
import { DefaultOptions } from './consts.js'
import { paddingCenter,isPlainFunction, consoleOutput, forEachInterpolateVars } from './utils.js'
import ansicolor from 'ansicolor'
import bannerPlugin from "./banner.plugin.js"
import progressbarPlugin from "./progressbar.plugin.js"
import tablePlugin from "./table.plugin.js"
import tasklistPlugin from "./tasklist.plugin.js"
import treePlugin from "./tree.plugin.js"
import listPlugin from "./list.plugin.js"
import { deepMerge } from 'flex-tools/object/deepMerge'
import { isPlainObject } from 'flex-tools/typecheck/isPlainObject'

const DEBUG = 'DEBUG'
const INFO  = 'INFO'
const WARN  = 'WARN'
const ERROR = 'ERROR'
const FATAL = 'FATAL'


// 'foreground colors'
//     .red.green.yellow.blue.magenta.cyan.white.darkGray.black
// 'light foreground colors'
//     .lightRed.lightGreen.lightYellow.lightBlue.lightMagenta.lightCyan.lightGray
// 'background colors'
//     .bgRed.bgGreen.bgYellow.bgBlue.bgMagenta.bgCyan.bgWhite.bgDarkGray.bgBlack
// 'light background colors'
//     .bgLightRed.bgLightGreen.bgLightYellow.bgLightBlue.bgLightMagenta.bgLightCyan.bgLightGray
// 'styles'
//     .bright.dim.italic.underline.inverse // your platform should support italic
 
 
 
/**
 * 根据模板字符串，输出着色后的内容
 * getColorizedTemplate("{a}+{b}={}")
 * getColorizedTemplate("{a}+{b}={}",[a,b,1])
 * getColorizedTemplate("{a}+{b}={c}",{a:1,b:1,c:2})
 * getColorizedTemplate("{#red a}+{b}={c}",{a:1,b:1,c:2})      #指定颜色
 *  
 * getColorizedTemplate("{#red a} +{b}") == a+b 其中a使用红色
 * 
 * 
 * @param {*} template   模板字符串,如"this is {a}+{b}" 或者 "this is {}+{}"
 * @param  {Array | object} vars
 * @returns
 */
function getColorizedTemplate(template,...args) {    
    let logOptions = this
    let vars
    if(arguments.length===1 && Array.isArray(arguments[0])){
        template = arguments[0][0]
        args= [...arguments][0].slice(1)
    }
    if (args.length === 1){
        vars =  typeof args[0] === 'function' ? args[0]() : 
         (isPlainObject(args[0]) ? args[0] : (Array.isArray(args[0]) ? args[0] : [args[0]]))
    }else{
        vars = args.map(arg=>{
            if(typeof arg === 'function') { try{arg = arg()}catch{}}
            if(arg===undefined || arg===null){
                return ""
            }else if(typeof(arg)=='object'){
                try{return JSON.stringify(arg)}catch{return String(arg)}
            }else{
                return arg
            }
        })
    }

    if(Array.isArray(vars)){
        let index = 0
        return forEachInterpolateVars(template,(word)=>{
            let [color,varname] = word.startsWith("#") ? word.split(" ") : ["",word]
            varname = (varname || '').trim()
            color=color.substring(1)
            if(color){// 指定了颜色
                const shader = getColorizeFunction(color) 
                return shader(index<vars.length ? vars[index++] : varname)
            }else{// 未指定颜色时根据数据类型的不同着色
                return colorize(index<vars.length ? vars[index++] : varname,logOptions)
            }            
        }) 
    }else if(isPlainObject(vars)){
        return forEachInterpolateVars(template,(word)=>{
            let [color,varname] = word.startsWith("#") ? word.split(" ") : ["",word]
            varname = (varname || '').trim()
            color=color.substring(1)
            if(color){// 指定了颜色
                const shader = getColorizeFunction(color) 
                return shader(varname in vars ? vars[varname] : varname)
            }else{// 未指定颜色时根据数据类型的不同着色
                return colorize(varname in vars ? vars[varname] : varname,logOptions)
            }            
        }) 
    }else{
        return template
    }
}

/**
 *
 * logOutput("DEBUG","this is a debug message",{a:1,b:2})  变量插值 只有两个参数
 * logOutput("DEBUG","this is a debug message",[1,2,3])      位置插值
 *
 * @param {*} level
 * @param  {} args
 */
function logOutput(level, message, args, memo) {
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")} ${now.getMilliseconds().toString().padStart(3, "0")}`.padEnd(12)
    const date = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getDate().toString().padStart(2, "0")}`
    // 超过指定的字符后进行截断换行
    if (this.levels.maxLineChars > 0 && message.length > this.levels.maxLineChars) {
        //message=message.substr(0,this.levels.maxLineChars)
    }
    //
    if (this.levels.align) {
        message = message.replaceAll('\n', '\n' + new Array(33).fill(' ').join(''))
    }
    if (!Array.isArray(args)) args = [args]
    message = getColorizedTemplate(message, ...args)

    // 变量插值
    let result = this.template.params({
        level: paddingCenter(level, 5),
        message,
        datetime: date + ' ' + time,
        time,
        date,
        ...isPlainObject(args[0]) ? {} : args[0]  // 额外的上下插值变量
    })
    let colorize = getColorizeFunction(this.levels[level.toLowerCase()])
    let output = colorize(result)
    if (memo) {
        output += getColorizeFunction(this.levels.memo)(`(${memo})`)
    }
    consoleOutput(output)
}

/**
 *
 *  logger.options({}).print(...)
 *  logger.options({}).print(...)
 *
 *  logger.styles({}).print(...)
 *
 * 在控制台打印输出着色后的内容
 * 使用方法同console.log,差别就在于输出内容的着色
 * this=logger.options
 **/
function print() {
    let args = [...arguments]
    let options = { end: "\n", append: " " }
    if (arguments.length >= 2 && isPlainObject(arguments[arguments.length - 1])) {
        args = args.slice(0, arguments.length - 1)
        Object.assign(options, arguments[arguments.length - 1])
    }


    consoleOutput(
        ...Array.from(args).map(arg => {
            if (isPlainFunction(arg)) {
                try {
                    arg = arg()
                } catch {
                    arg = "ERROR"
                }
            }
            if (typeof (arg) === "string") {
                return arg
            } else {
                return colorize(arg, this)
            }
        }),
        options
    )
}

function format(value, options = {}) {
    if (typeof value === 'function') value = value()
    const opts = Object.assign({ 
        title:''
    }, options)
    consoleOutput(colorize(value,deepMerge(this, opts)))
}

/**
 *  this=logger.options
 * @param {*} template
 * @param  {...any} args
 */
function printTemplate(message, ...args) {
    consoleOutput(getColorizedTemplate.call(this, message, ...args))
}

/**
 *
 *  const logger = createLogger({})
 *  logger.log("{a}+{b}",{a:1,b:2})                  // 变量插值输出
 *  logger.log("{}+{}",1,2)                          // 位置参数插值输出
 *  logger.print(...)
 *  logger.config({compact:true}).print(...)         // 设置全局配置
 *  logger.set().print(...)                          // 设置临时配置
 *  logger.log("this is {a}+{b}",{a:1,b:2})
 *  logger.info("this is {a}+{b}",{a:1,b:2})
 *  logger.warn("this is {a}+{b}",1,2)
 *
 *
 * @param {*} opts
 */

function createLogger(opts = {}) {
    let options = deepMerge(DefaultOptions, opts)
    let log = {}
    log.log                  = (message, ...args) => printTemplate.call(options, message, ...args)
    log.print                = (...args) => print.call(options, ...args)
    log.format               = (...args) => format.call(options, ...args)
    log.debug                = (...args) => logOutput.call(options, DEBUG, ...args)
    log.info                 = (...args) => logOutput.call(options, INFO, ...args)
    log.warn                 = (...args) => logOutput.call(options, WARN, ...args)
    log.error                = (...args) => logOutput.call(options, ERROR, ...args)
    log.fatal                = (...args) => logOutput.call(options, FATAL, ...args)
    log.use                  = (plugin) => plugin(log, options)
    log.colorizeObject       = (arg) => colorize(arg, options)
    log.colorizeString       = (text,style) => colorizeString(text,style)
    log.getColorizer         = getColorizeFunction.bind(options)
    log.getColorizedTemplate = getColorizedTemplate.bind(options)
    log.separator            = (n = 80, char = "─") => { consoleOutput(new Array(n).fill(char).join('')) }
    log.options              = options
    log.colors               = ansicolor 
    log.config = opts => {
        if (isPlainObject(opts)) {
            Object.assign(options,deepMerge(options, opts))
        }
        return log
    }
    // 引入所有内置插件
    log.use(bannerPlugin)
    log.use(progressbarPlugin)
    log.use(tablePlugin)
    log.use(tasklistPlugin)
    log.use(treePlugin)
    log.use(listPlugin)
    return log
}

const defaultLogger = createLogger()

Object.assign(createLogger,defaultLogger)

export default createLogger