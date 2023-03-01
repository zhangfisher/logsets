
import type { NamedColorStyles } from "./colors"
import type { Logsets } from "./"
import type { DeepRequired } from "ts-essentials"

export type PresetThemes = 'default' | 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan'
 
export interface ProgressbarPluginOptions { 
    title?    : string          // 显示标题
    theme?     : PresetThemes | undefined         // 一些预设好的主题配色,
    max?       : number          // 最大值
    min?       : number          // 最小值
    value?     : number          // 当前值   
    dispaly?   : string          // 备注字符串,支持插值变量{value} {percent} {max} {min}
    width?     : number          // 进度条宽度 
    background?: {               // 进度条样式
        show?  : boolean         // 是否显示背景，默认显示，不显示时只显示进度条滑块
        style? : NamedColorStyles          // 进度条样式
        char?  : string
    },       
    slider?    : {               // 滑块字符
        style? : NamedColorStyles          // 进度条样式
        char?  : string
    } 
}

export interface Progressbar {    
    begin():void
    value(n:number):void
    end(note?:string):void
    stop(note?:string):void
    error(note?:string):void
}

export declare const ProgressbarPlugin: {
    (logsets:Logsets,options:DeepRequired<ProgressbarPluginOptions>):Progressbar
}

export default ProgressbarPlugin
 