 
/**
import createLogger from "coloredLogger"
import tasklistPlugin from "logsets/plugins/progressbar"" 
const logsets = createLogger({...})
logsets.use(tasklistPlugin)

const tasks = logsets.tasklist({
     
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

 ▪▢◇~


   
 */

import { consoleOutput, getStringWidth,hideCursor,showCursor,newline, paddingEnd ,paddingCenter} from './utils.js' 
import { deepMerge } from 'flex-tools' 



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
        abort:{
            style:"red",
            symbol:"×",
            note:"ABORT"            
        },
        fail:{
            style:"red",
            symbol:"×",
            note:"FAIL"            
        },
        cancel:{
            style:"red",
            symbol:"×",
            note:"CANCEL"            
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
        },
        ignore:{
            style:"blue",
            symbol:"~",
            note:"IGNORE"
        }
    }  
}
 
  
function createTaskList(context,options){
    const logsets = this  
    const opts = deepMerge({},DefaultTaskListOptions,options) 
    let curIndent = opts.indent
    // 显示任务标题 ? bright
    if(opts.title){
        let titleColorizer = logsets.getColorizer(opts.style)
        const title =Array.isArray(opts.title) ? opts.title : [opts.title] 
        console.log(titleColorizer(logsets.getColorizedTemplate(...title)))
    }     

    let curTask = null
 
    const spinnerChars = ["|","/","-","\\","|","/","-","\\"]
    const getColorizer = logsets.getColorizer 

    function createTask(...args){ 
        const self = this 
        let status = "running"     // 0-进行中，1-完成，2-错误，3-跳过，4-停止
        let spinnerIndex = 0       // 动态旋转序号
        let spinnerDir = 0          // 动态旋转方向
        let progressValue = 0      // 进度值
        let timer = null
        let listNote = null
        self.isEnd = ()=>status!="running"
        self.note = (info) => listNote = logsets.colors.darkGray(paddingEnd(info,20))
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
            let title = logsets.getColorizedTemplate(...args)
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
            consoleOutput(`${curIndent}${symbol} ${title}${progressbar}${note}`,{end:"\r"})
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
        self.indent = ()=>{curIndent = curIndent + opts.indent}
        self.outdent = (reset)=>{
            curIndent = (curIndent=='' || reset==true) ? opts.indent : curIndent.substring(0,curIndent.length-opts.indent.length)
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
        options:opts,
        add(...args){
            // 自动完成上一个任务
            if(curTask && !curTask.isEnd()){ 
                curTask.complete()             
            }            
            curTask = new createTask(...args)
            curTask.start()
            hideCursor()
            return curTask
        },
        indent(str){
            curTask.indent(str)
        },
        outdent(reset){
            curTask.outdent(reset)
        },
        // 运行workr任务函数
        async run(){
            let title,vars,worker,options
            if(arguments.length==2){
                title=arguments[0]
                worker=arguments[1]
            }else if(arguments.length==3){
                title=arguments[0]
                vars=arguments[1]
                worker=arguments[2]
            }else if(arguments.length==4){
                title=arguments[0]
                vars=arguments[1]
                worker=arguments[2]
                options=arguments[3]
            }else{
                throw new TypeError()
            }
            const taskOpts = Object.assign({
                catchError:false,            // 当运行worker出错时是否捕获
                showErrorStack:true         // 显示错误堆栈详细信息
            }, options)
            // 自动完成上一个任务
            if(curTask && !curTask.isEnd()){ 
                curTask.complete()             
            }            
            curTask = new createTask(title,vars)
            curTask.start()
            let result = 'ok'
            try{
                result = await worker()
                if(typeof(result) == 'string' && (result.toLowerCase() in opts.status)){
                    curTask[result.toLowerCase()]()
                }else if(Array.isArray(result)){
                    if(result.length<2) result.push(undefined)
                    if(typeof(result[0]) == 'string' && (result[0].toLowerCase() in opts.status)){
                        curTask[result[0].toLowerCase()](result[1])
                    }else{
                        curTask.complete()    
                    }
                }else{
                    curTask.complete(result)
                }                
            }catch(e){
                curTask.error(e.message)                
                if(taskOpts.showErrorStack && taskOpts.catchError){
                    logsets.log(e.stack)
                }
                if(!taskOpts.catchError){
                    throw e
                }
            }
            return result
        },
        separator(title="",char="─"){
            if(!title) title=''
            if(title=="-") title = "─"
            if(curTask && !curTask.isEnd()){ 
                curTask.abort()
                curTask=null
            }
            consoleOutput(opts.indent + logsets.colors.darkGray(paddingCenter(title,opts.width+4,char)))
            
            // consoleOutput(opts.indent + logsets.colors.darkGray(new Array(opts.width + 2).fill(char).join("")))
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
 * 创建多任务列表
 * 
 * let tasks = createTasks([
 *      {
 *          title:"任务标题",
 *          execute:async ()=>{...}
 *          complete:"任务完成时显示的内容", 
 *          complete:async ({result,abort,task})=>{
 *              abort() // 调用abort()中止后续任务
 *              return "显示内容：如果没有则显示打钩符号代表完成"
 *              return "skip"           // 跳过
 *              return ()=>{
 *                  task.skip()
 *              }           // 执行其他状态方法  
 *          },
 *          error:"任务出错时显示的内容:{error}代表错误信息",
 *          error:async (result:any,next,abort)=>{
 * 
 *          },
 *          
 * 
 *      }
 * 
 * ],{
 *  abortOnError:true               // 当某个任务出错时是否中止后续任务
 *  context?:any                    // 任务执行上下文，用来传递给execute函数
 * }})
 * 
 * 
 * results = await tasks.run()          // 执行任务后择业
 * 
 * 
 * @param {CreateTaskOptions} options 
 */
export function createTasks(logsetContext,tasks=[],options={}){
    const {abortOnError=true,ignoreErrors=false} = options || {}
    const logsets = this
    if(!Array.isArray(tasks)) throw new TypeError("tasks must be an array")
    return {
        run:async (title,context)=>{
            let hasError = false
            let taskList = logsets.tasklist({
                title,
                indent:"  "
            })
            const ctx = context || {}
            let errors=[]
            let hasAbort =false
            for(let i=0;i<tasks.length;i++){
                const taskInfo = tasks[i]
                const taskTitle = (Array.isArray(tasks[i].title) ? tasks[i].title: [tasks[i].title])
                const task = typeof(taskInfo)=="string" ? taskList.separator(taskInfo) : taskList.add(...taskTitle)
                if(typeof(taskInfo)=="string") continue // 忽略分割符                
                if(typeof(taskInfo.execute)=="function"){
                    try{
                        ctx.task = task
                        const result = await taskInfo.execute.call(ctx,ctx)   
                        let [status,tip]=result ? (Array.isArray(result) ? result : (
                            result in taskList.options.status ? [result] : ["complete",result])) : ["complete"]
                        status = status.toLowerCase()
                        if(status=='abort'){
                            task.abort(tip)
                            hasAbort=true
                            if(!ignoreErrors) break
                        }else if(status in taskList.options.status){
                            task[status](tip)
                        }else{
                            task.complete(tip)
                        }
                    }catch(error){
                        hasError=error
                        errors.push(error)
                        let errorResult = taskInfo.error
                        if(typeof(taskInfo.error)=="function"){
                            errorResult = await taskInfo.error.call(ctx,{error,context:ctx})
                        }
                        let [errStatus,errTip]= errorResult ? (Array.isArray(errorResult) ? errorResult : (
                            errorResult in taskList.options.status ? [errorResult] : ["error",errorResult])) : ["error"]                        
                        errStatus = errStatus.toLowerCase()
                        if(typeof(errTip)=='string'){
                            errTip=errTip.replace("{message}",error.message)
                            errTip=errTip.replace("{code}",error.code)
                            errTip=errTip.replace("{stack}",error.stack)
                        }                        
                        if(errStatus=='abort'){
                            task.abort(errTip)
                            hasAbort=true
                            if(!ignoreErrors) break
                        }else if(errStatus in taskList.options.status){
                            task[errStatus](errTip)
                        }else{
                            task.error(errTip)
                        }
                    }
                }else{
                    task.skip()
                } 
                if(!ignoreErrors && hasError && (abortOnError || hasAbort)){
                    throw hasError
                }
            }
            if(!ignoreErrors && hasError && (abortOnError || hasAbort)){
                throw hasError
            }
            if(errors && errors.length>0){
                ctx.errors=errors
            }
            return ctx
        }    
    }

}

export async function runTasks(logsetContext,tasks=[],options={}){
    const runner = createTasks.call(this,logsetContext,tasks,options)
    await runner.run(options.title,options.context)
}


/**
 * 
 * @param {*} log  指向logsets实例
 * @param {*} context  指向logsets实例的context
 */
 export default function(logsets,context){
    logsets.tasklist = (opts)=>{
        if(typeof(opts)=="string") opts={title:opts}
        return createTaskList.call(logsets,context,opts)
    }
    logsets.task = (...args)=>{
        let tasks = createTaskList.call(logsets,context,{title:null,indent:"",width:62})
        return tasks.add(...args)
    }
    logsets.createTasks=(tasks,opts)=>createTasks.call(logsets,context,tasks,opts)
    logsets.run=async (tasks,opts)=>await runTasks.call(logsets,context,tasks,opts)
}
 