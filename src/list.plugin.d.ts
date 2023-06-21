import type { Logsets } from "."
import type { DeepRequired } from "ts-essentials"

export interface ListPluginOptions  { 
    indent?       : string                          // 整体缩进
    showOrderNumber?:boolean                       // 是否显示序号
    title?        : {
       emoji?     :  string                        // 默认的总结项图标
       style?     : string,               // 标题颜色
    },
    item?:{
       indent?       :string
       type?      : [string,string]
       style?     : [string,string]
    }
}

export interface ListItem{
    title:string | [string,string]
    description?:string
    type?:string | [string,string]
    style?:string | [string,string]

}
 
export interface List{
    show(title:string | [string,...any],items:(string|ListItem)[],options?:ListPluginOptions):void
}

export declare const ListPlugin: {
    (logsets:Logsets,options:DeepRequired<ListPluginOptions>):List
}

export default ListPlugin
 