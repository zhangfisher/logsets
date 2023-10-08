import type { Banner,BannerPluginOptions } from "./banner.plugin"
import type { Task,TaskList,TaskListPluginOptions,CreateTaskDefine,CreateTasksOptions,TaskRunner } from "./tasklist.plugin"
import type { Progressbar,ProgressbarPluginOptions } from "./progressbar.plugin"
import type { Tree,TreePluginOptions } from "./tree.plugin"
import type { Table,TablePluginOptions} from "./table.plugin"
import type { NamedColorStyles } from "./colors"
import type ansicolor from "ansicolor"
import type { ListPluginOptions,ListItem} from './list.plugin';

export type Class = new (...args: any[]) => any

export type DataTypeColorizeOptions = string | {
    style?:NamedColorStyles
    format?:(value:any) => string
}

export interface LogsetsOptions{
    indent?:string                                          // 缩进
    singleQuotes?: boolean                                  // 显示单引号 
    template?:string                                        // 模板
    compact?:boolean                                        // 是否采用紧凑模式输出
    Array?:{
        maxItems?:number                                    // 数组最大长度，超过则显示省略号
        memo?: (value:any[]) => string                      // 当数组数量超过maxItems时，显示共几项的备注
    },
    Object?:{
        maxItems?:number                                       // 成员数量，超过则显示省略号
        align?:boolean                                         // 是否自动对齐
        memo?:(value:any[]) => string 
    },
    Null?     : DataTypeColorizeOptions 
    Undefined?: DataTypeColorizeOptions
    Boolean?  : DataTypeColorizeOptions
    Number?   : DataTypeColorizeOptions
    String?   : DataTypeColorizeOptions
    Symbol?   : DataTypeColorizeOptions
    AsyncFunction?: DataTypeColorizeOptions & { format?:(value:Function)=>string }
    Function? : DataTypeColorizeOptions & { format?:(value:Function)=>string }
    Error?    : DataTypeColorizeOptions & { format?:(value:Error)=>string }
    Class?    : DataTypeColorizeOptions & { format?:(value:Class) => string}
    Instance? : DataTypeColorizeOptions & { format:(value:object)=>string }
    Date?     : DataTypeColorizeOptions & { format:(value:Date)=>string }     
    RegExp?   : DataTypeColorizeOptions  & { format:(value:RegExp)=>string }

    levels?   :{
        align?: boolean                                        // 是否自动对齐消息
        maxLineChars?  : number                                 // 每行最大字符数 
        memo?     : NamedColorStyles
        debug?    : NamedColorStyles
        info?     : NamedColorStyles
        warn?     : NamedColorStyles
        error?    : NamedColorStyles
        fatal?    : NamedColorStyles
    } 
};

export interface Logsets{
    // 注册插件
    use(plugin:LogsetsPlugin):void
    
    //模板字符串着色输出
    log(message: string):void
    log(message: string,vars?:any[]):void
    log(message: string,vars?:Record<string,any>):void
    log(message: string,...vars:any[]):void
    
    // 根据数据类型的不同进行着色后输出
    print(...args: any[]):void
    print(arg:any,options?:{end?:string,append?:string}):void
    print(arg1:any,arg2:any,options?:{end?:string,append?:string}):void
    print(arg1:any,arg2:any,arg3:any,options?:{end?:string,append?:string}):void
    
    // 带缩进格式和着色过的对象
    format(obj:Record<string,any> | any[],options?:{end?:string,append?:string}):void
    
    // 日志输出
    debug(message:string,args?:any[] | Record<string,any>,memo?:string):void
    info(message:string,args?:any[] | Record<string,any>,memo?:string):void
    warn(message:string,args?:any[] | Record<string,any>,memo?:string):void
    error(message:string,args?:any[] | Record<string,any>,memo?:string):void
    fatal(message:string,args?:any[] | Record<string,any>,memo?:string):void 
    
    // 返回对JSON对象进行着色
    colorizeObject(arg:object | any[]):void 
    
    // 返回对字符串进行着色
    colorizeString(arg:string,style?:string):void 
    
    // 返回着色后的字符串
    getColorizer(style:string) : Colorizer
    
    // 对插值变量进行插值返回着色后的字符串
    getColorizedTemplate(template:string,vars?:any[] | Record<string,any>) : string
    getColorizedTemplate(template:string,...vars:any[]) : string
    
    // 输出分割线
    separator(length?:number,char?:string):void
    
    options:LogsetsOptions
    
    colors:ansicolor
    
    config(options:LogsetsOptions):Logsets

    banner(options?:BannerPluginOptions):Banner
    tasklist(options?:TaskListPluginOptions | string):TaskList<Exclude<(typeof options),undefined>['status']>
    createTasks(tasks:CreateTaskDefine[],options?:CreateTasksOptions):TaskRunner
    run(title:string | [string,...any],tasks:CreateTaskDefine[],options?:RunTasksOptions):Promise<any>
    task(title:string,vars?:any[] | Record<string,any>):Task
    task(title:string,...vars:any[]):Task
    progressbar(options?:ProgressbarPluginOptions):Progressbar
    tree(options?:TreePluginOptions):Tree
    table(options?:TablePluginOptions):Table
    list(title:string | [string,...any] ,items:(string|ListItem)[],options?:ListPluginOptions):void
}



// 返回对字符串进行着色
export type Colorizer = (text:string)=>string
export type LogsetsPlugin = (log:Logsets,options:Record<string,any>)=>void;

export declare var createLogsets: {
    (options?:LogsetsOptions):Logsets  
} & Logsets

export default createLogsets  


export * from "./banner.plugin"
export * from "./tasklist.plugin"
export * from "./progressbar.plugin"
export * from "./tree.plugin"
export * from "./table.plugin"
export * from "./colors"
 