import type { NamedColorStyles } from "./colors"
import type { Logsets } from "./"
import type { DeepRequired } from "ts-essentials"

export interface TaskListStatus{
    style?:NamedColorStyles
    symbol?:string
    note?:string
}

export interface TaskListPluginOptions{ 
    indent?    : string         // 列表缩进字符
    style?     : NamedColorStyles         // 标题样式
    width?     : number         // 列表总宽度
    refInterval?:number         // 列表项渲染间隔
    progressbar?:{
        style?:NamedColorStyles           // 进度条样式
        char?:string            // 进度条字符
    },
    status?:Record<string,TaskListStatus>
}
export type CustomTaskList<CUSTOM_STATUS> = {
    [key in keyof CUSTOM_STATUS]: (note?:string)=>void 
}
export interface Task {    
    note(info:string):void
    running():boolean    
    start():void
    end():void
    running(note?:string):void
    complete(note?:string):void
    error(note?:string):void
    fail(note?:string):void
    skip(note?:string):void
    stop(note?:string):void
    todo(note?:string):void 
    ignore(note?:string):void
    cancel(note?:string):void 
}

export type InlineTaskStatus =  'ignore' | 'running' | 'complete' | 'error' | 'abort' | 'fail' | 'cancel' | 'skip' | 'stop' | 'todo'

export type TaskWrokerResult =void |  string | InlineTaskStatus | Uppercase<InlineTaskStatus> | [InlineTaskStatus,string] |  [Uppercase<InlineTaskStatus>,string] 

export type TaskList<CUSTOM_STATUS=any> = {
    add(title:string,vars?:any[] | Record<string,any>):void
    add(title:string,...vars:any[]):void
    // 运行函数任务
    run(title:string,vars:any[] | Record<string,any>,worker:()=>Promise<TaskWrokerResult>,options?:{catchError?:boolean,showErrorStack?:boolean}):TaskWrokerResult
    run(title:string,worker:()=>Promise<TaskWrokerResult>,options?:{catchError?:boolean,showErrorStack?:boolean}):TaskWrokerResult
    separator(char?:string):void
    
} & Task & CustomTaskList<CUSTOM_STATUS>



export declare const TaskListPlugin: {
    (logsets:Logsets,options:DeepRequired<TaskListPluginOptions>):TaskList
}


export type  ExecuteContext = {
    task:Task
} & Record<string,any>


// createTasks类型
export type CreateTaskDefine = {
    title:string | [string,...rest]
    execute:(context?:ExecuteContext)=>Promise<InlineTaskStatus | string | [InlineTaskStatus,string] | void>,
    error?:string | ((
        {error}:{error?:Error}
    )=>Awaited<InlineTaskStatus | string | [InlineTaskStatus,string] | void>)
}  
export interface CreateTasksOptions{
    abortOnError?:boolean
    ignoreErrors?:boolean          
}

export type TaskRunner={
    run(title?:string,context?:ExecuteContext):any
}


export default TaskListPlugin
 