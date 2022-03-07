import colorize, { getColorizeFunction } from './colorize.js'
import deepmerge from 'deepmerge'
import { DefaultOptions } from './consts.js'
import {  firstUpper, isPlainObject,  paddingCenter,isPlainFunction  } from './utils.js'

const DEBUG = 'DEBUG'
const INFO = 'INFO'
const WARN = 'WARN'
const ERROR = 'ERROR'
const FATAL = 'FATAL'

/**
 * 当参数大于2个，并且最后一个参数是一个{}时，视为控制配置参数
 * 
 * consoleOuput(1,{
 *    append:" ",            // 默认每一个参数后面添加的字符串，默认空格 
 *    end:0 | 1 | 2, // 结束字符
 *        0=不追加,这次就可以实现多次输出在一行中
 *        1=是否回车，即回退到行尾，用来实现覆写
 *        2=换行符
 * })
 * 
 * @param  {...any} texts 
 */
function consoleOuput(...texts){
    let options = {
        append:" ",
        end:"\n"  //换行符
    }
    if(texts.length>=2 && isPlainObject(texts[texts.length-1])){
        Object.assign(options,texts.pop())
    }
    texts.forEach(text=>{
        process.stdout.write(text+options.append)
    }) 
    if(options.end){
        process.stdout.write(options.end) 
    }
}

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


let ParamRegExp = /\{\w*\}/g

/**
 * 添加一个params参数，使字符串可以进行变量插值替换，
 * "this is {a}+{b}".params({a:1,b:2}) --> this is 1+2
 * "this is {a}+{b}".params(1,2) --> this is 1+2
 * "this is {}+{}".params([1,2]) --> this is 1+2
 * @param {*} params
 * @returns
 */
 if(!String.prototype.hasOwnProperty("params")){
    String.prototype.params = function (params) {
    let result = this.valueOf()
    if (typeof params === 'object') {
        for (let name in params) {
        result = result.replace('{' + name + '}', params[name])
        }
    } else {
        let i = 0
        for (let match of result.match(ParamRegExp) || []) {
        if (i < arguments.length) {
            result = result.replace(match, arguments[i])
            i += 1
        }
        }
    }
    return result
    }
}               
String.prototype.trimBeginChars = function (chars) {
  if (chars) {
    let index = this.indexOf(chars)
    if (index === 0) {
      return this.substr(chars.length)              
    }
  }
  return this.valueOf()
}

String.prototype.firstUpper  =function(){
    return this.charAt(0).toUpperCase()+this.substring(1)
}


/**
 * 根据模板字符串，输出着色后的内容
 * @param {*} template   模板字符串,如"this is {a}+{b}" 或者 "this is {}+{}"
 * @param  {...any} args
 * @returns
 */
function getColorizedTemplate (template, ...args) {
  if (
    args.length === 1 &&
    (isPlainObject(args[0]) || typeof args[0] === 'function')
  ) {
    let params = typeof args[0] === 'function' ? args[0]() : args[0]
    Object.keys(params).forEach(key => {
      params[key] = colorize(params[key], this)
    })
    for (let name in params) {
      template = template.replace(
        new RegExp(`\{\s*\(${name})\s*\}`, 'g'),
        params[name]
      )
    }
    return template
  } else {
    args = args.map(arg => {
      if (typeof arg === 'function') arg = arg()
      return colorize(arg, this)
    })
    return template.params(...args)
  }
}

/**
 *
 * logOutput("DEBUG","this is a debug message",{a:1,b:2})  变量插值 只有两个参数
 * logOutput("DEBUG","this is a debug message",1,2,3)      位置插值
 *
 * @param {*} level
 * @param  {...any} args
 */
function logOutput (level, message, args, memo) {
  const now = new Date()
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getMilliseconds()}`
  const date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
  // 超过指定的字符后进行截断换行
  if (
    this.levels.maxLineChars > 0 &&
    message.length > this.levels.maxLineChars
  ) {
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
  consoleOuput(output)
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
function print () {
    let args = [...arguments]
    let options = {end:"\n",append:" "}
    if(arguments.length>=2 && isPlainObject(arguments[arguments.length-1])){
        args = args.slice(0,arguments.length-1)
        Object.assign(options,arguments[arguments.length-1])
    }
    

    consoleOuput(
        ...Array.from(args).map(arg => {
            if (isPlainFunction(arg)) {
                try{
                    arg = arg()
                }catch{
                    arg = "ERROR"
                }
            }
            if(typeof(arg)==="string"){
                return arg
            }else{
                return colorize(arg, this)
            }      
        }),
        options
    )
}
 
function format (value,options={}) {
  if (typeof value === 'function') value = value()
  consoleOuput(colorize(
        value,
        deepmerge(this, deepmerge({
           Array: { compact: false },
           Object: { compact: false }
        },options))
      ) 
  )
}

/**
 *  this=logger.options
 * @param {*} template
 * @param  {...any} args
 */
function printTemplate (message, ...args) {
  consoleOuput(getColorizedTemplate.call(this,message, ...args))
}

/**
 *
 *  const logger = createLogger({})
 *  logger.log("{a}+{b}",{a:1,b:2})                        // 变量插值输出
 *  logger.log("{}+{}",1,2)                                // 位置参数插值输出
 *  logger.print(...)
 *  logger.config({compact:true}).print(...)         // 设置全局配置
 *  logger.set().print(...)                          // 设置临时配置
 *  logger.log("this is {a}+{b}",{a:1,b:2})
 *  logger.info("this is {a}+{b}",{a:1,b:2})
 *  logger.warn("this is {a}+{b}",1,2)
 *
 *
 * @param {*} options
 */

export default function createLogger (options = {}) {
  let context = deepmerge(DefaultOptions, options)
  let log = {}
  log.log = (message, ...args) => {
    printTemplate.call(context,message, ...args)
  }
  log.print = (...args) => print.call(context, ...args)
  log.format = (...args) => format.call(context, ...args)
  log.debug = (...args) => logOutput.call(context, DEBUG, ...args)
  log.info = (...args) => logOutput.call(context, INFO, ...args)
  log.warn = (...args) => logOutput.call(context, WARN, ...args)
  log.error = (...args) => logOutput.call(context, ERROR, ...args)
  log.fatal = (...args) => logOutput.call(context, FATAL, ...args)
  log.use = (plugin) => plugin(log,context)  
  log.colorize = (arg) => colorize(arg, context)
  log.options = context
  log.config = opts => {
    if (isPlainObject(opts)) {
      context = deepmerge(context, opts)
    }
    return log
  }
  return log
}
