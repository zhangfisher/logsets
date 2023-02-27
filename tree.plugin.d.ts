
import type { NamedColorStyles } from "./colors"

export interface TreePluginOptions { 
    root?:string    
    width?: number                     // 当显示备注信息时，树的总宽度
    indent?:string                     // 缩进字符
    node?:{
        style?:NamedColorStyles                  // 默认节点样式
    },
    note?:{                             // 节点备注
        enable?:boolean
        style?:NamedColorStyles                   // 文本样式
        char?:string 
    } 
}

export interface Tree {     
    addNode(text:string, options?:{style?:string; boolean?:boolean,note?:string}):Tree
    beginChildren():Tree
    endChildren():Tree

}

export declare const TreePlugin: {
    (logsets:Logsets,options:DeepRequired<TreePluginOptions>):Tree
}

export default TreePlugin
 