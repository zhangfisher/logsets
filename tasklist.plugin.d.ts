
export interface TaskListStatus{
    style?:string
    symbol?:string
    note?:string
}

export interface TaskListPluginOptions{ 
    indent?    : string         // 列表缩进字符
    style?     : string         // 标题样式
    width?     : number         // 列表总宽度
    refInterval?:number         // 列表项渲染间隔
    progressbar?:{
        style?:string           // 进度条样式
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
}

export type TaskList<CUSTOM_STATUS=any> = {
    add(text:string,vars?:any[] | Record<string,any>):void
    add(text:string,...vars:any[]):void
    separator(char?:string):void
} & Task & CustomTaskList<CUSTOM_STATUS>



export declare const TaskListPlugin: {
    (logsets:Logsets,options:DeepRequired<TaskListPluginOptions>):TaskList
}

export default TaskListPlugin
 