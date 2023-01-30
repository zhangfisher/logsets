 
/**
import createLogger from "coloredLogger"
import tasklistPlugin from "logsets/plugins/progressbar"" 
const logger = createLogger({...})
logger.use(tasklistPlugin)

const tasks = logger.tasklist({
     
})

tasks.add("准备复制文件")

task.complete()
task.error()
task.skip()
task.doing()

downloads.forEach(download=>{
    tasks.add(download.name)
    try{
        ...await http.download(url)
    }catch(e){
        tasks.error(e.message)
    }
    
    tasks.complete()        // 可选，如果没有指定，则add会自动完成当前任务
    tasks.error()
    tasks.skip()
})
// 进入下一个任务
tasks.next()

开始构建列表：
  √ 准备复制文件....................................OK
  × 构建列表列表....................................ERROR
  ● 编译列表........................................CANCEL
  - 渲染列表........................................OK
  - 渲染列表........................................ERROR
  - 渲染列表........................................| / \ ──

 

 */

import deepmerge from 'deepmerge'
import { consoleOutput, getStringWidth,hideCursor,showCursor,newline, paddingEnd } from './utils.js' 

const DefaultTaskListOptions  = { 
    indent    : "  ",       // 列表缩进 
    style     : "bright",   // 标题样式
    width     : 60,         // 列表总宽度
    refInterval:100,        // 列表项渲染间隔
    progressbar:{
        style:"darkGray",           // 进度条样式
        char:".",           // 进度条字符
    },
    status:{   
        running:{
            style:"white",
            symbol:"-",
            note:""
        },        
        complete:{
            style:"green",
            symbol:"√",
            note:"OK"
        },
        error:{
            style:"red",
            symbol:"×",
            note:"ERROR"            
        },
        fail:{
            style:"red",
            symbol:"×",
            note:"FAIL"            
        },
        skip:{
            style:"yellow",
            symbol:"○",
            note:"SKIP"
        },
        stop:{
            style:"red",
            symbol:"●",
            note:"STOP"
        },
        todo:{
            style:"lightCyan",
            symbol:"□",
            note:"TODO"
        }
    }  
}
 
  
function createTaskList(context,options){
    const logger = this  
    if(typeof(options)=="string") options = {title:options}
    const opts = deepmerge(DefaultTaskListOptions,options) 

    // 显示任务标题 ? bright
    if(opts.title){
        let titleColorizer = logger.getColorizer(opts.style)
        const title =Array.isArray(opts.title) ? opts.title : [opts.title] 
        console.log(titleColorizer(logger.getColorizedTemplate(...title)))
    }     

    let curTask = null
 
    const spinnerChars = ["|","/","-","\\","|","/","-","\\"]
    const getColorizer = logger.getColorizer 

    function createTask(...args){ 
        const self = this 
        let status = "running"     // 0-进行中，1-完成，2-错误，3-跳过，4-停止
        let spinnerIndex = 0       // 动态旋转序号
        let spinnerDir = 0          // 动态旋转方向
        let progressValue = 0      // 进度值
        let timer = null
        let listNote = null
        self.running = ()=>status=="running"
        self.note = (info) => listNote = logger.colors.darkGray(paddingEnd(info,20))
        self.render = ()=>{
            // 显示列表项符号
            const symbolOptions =  opts.status[status]
            let symbol = symbolOptions.symbol
            if(status==="running"){
                symbol = spinnerChars[spinnerIndex++]
                if(spinnerIndex>=spinnerChars.length) {
                    spinnerIndex = 0  
                }
                symbol = getColorizer(symbolOptions.style)(symbol) 
            }else{
                symbol = getColorizer(symbolOptions.style)(symbolOptions.symbol)                
            }
            // 文本内容
            let title = logger.getColorizedTemplate(...args)
            // 显示进度条
            let progressbarWidth = opts.width - getStringWidth(title) 
            let progressbar = ""
            if(progressbarWidth<1) progressbarWidth = 0
            if(opts.progressbar.char.length>0 && progressbarWidth>0){
                progressValue ++ 
                if(progressValue>progressbarWidth) progressValue = 0
                if(status!=="running"){
                    progressValue = progressbarWidth
                }
                progressbar = new Array(progressValue).fill(opts.progressbar.char).join("")
                progressbar = paddingEnd(progressbar,progressbarWidth," ")
                progressbar = getColorizer(opts.progressbar.style)(progressbar)
            }     
            // 显示note
            let note =listNote || opts.status[status].note
            note = paddingEnd(getColorizer(opts.status[status].style)(note),30)
            consoleOutput(`${opts.indent}${symbol} ${title}${progressbar}${note}`,{end:"\r"})
        }
        self.start = function(){
            timer = setInterval(()=>{
                if(status!=="running") clearInterval(timer)     //  停止任务
                self.render()                           // 反复渲染任务
            },opts.refInterval)
        }
        self.end=()=>{
            clearInterval(timer) 
            self.render()
            newline()
            showCursor()
        }
        Object.entries(opts.status).forEach(([key,state])=>{
            self[key] = (note)=>{            
                let finalNote = note
                if(typeof(note)==="function") finalNote = note()
                if(finalNote instanceof Error)  finalNote = note.error
                listNote = note || state.note
                status = key
                self.end()
            }
        }) 
    }

    let tasklistObj =  {
        add(...args){
            if(curTask && !curTask.isEnd()){
                curTask.complete()
            }
            curTask = new createTask(...args)
            curTask.start()
            hideCursor()
            return curTask
        },
        separator(char="─"){
            consoleOutput(opts.indent + logger.colors.darkGray(new Array(opts.width + 2).fill(char).join("")))
        }
    }
    Object.entries(opts.status).forEach(([key,state])=>{
        tasklistObj[key] = note=>{
            if(curTask){
                curTask[key](note)
            }
        }
    }) 
    return tasklistObj
}
 
/**
 * 
 * @param {*} log 
 * @param {*} context  当前表格的上下文配置参数
 */
 export default function(logger,context){
    logger.tasklist = (opts={})=>createTaskList.call(logger,context,opts)
    logger.task = (...args)=>{
        let tasks = createTaskList.call(logger,context,{title:null,indent:"",width:62})
        return tasks.add(...args)
    }
}
 