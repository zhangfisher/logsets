import type { NamedColorStyles } from "./colors"
import type { Logsets } from "../dist/index.cjs"
import type { DeepRequired } from "ts-essentials"

export interface TableColumnAttrs { 
    align?:"left" | "center" | "right"
    width?:"auto" | number
    color?:NamedColorStyles
}
export enum TableRowType{
    ROW       = 0,
    SEPARATOR = 1,
    SUMMARY   = 2
}
export interface TablePluginOptions { 
    colorize?:number,                               // 是否需要颜色化 0-禁用着色,1-简单着色 2-对表单元里面的对象和数组进行着色,需要额外的计算
    grid?:number,                                   // 是否显示网络线,0-不显示，1-显示垂直线，2-同时显示垂直和水平线
    maxColWidth?:number                             // 最大列宽,超过会显示省略号
    colPadding?:string                              // 列间距
    header?:{
        style?:NamedColorStyles                     // 表头颜色样式，默认高亮 
    },                                    
    footer?:{
        style?:NamedColorStyles                     // 表尾颜色样式                 
        merge?:true                                 // 合并行
        align?:"left" | "center" | "right"          // 当合并时对齐方式
    },
    summary?:{                                      // 默认汇总行配置
        style?:NamedColorStyles                     // 汇总颜色样式
        align?:"left" | "center" | "right"          // 汇总对齐方式
    },
    cols?:TableColumnAttrs[]                        // 列定义 = [{align:"center",width:"auto",color:"auto"},...]                 

} 
export interface TableColDefine{
    title?:string
    style?:NamedColorStyles
    align?:"left" | "center" | "right"
}
export interface Table {
  addRow(...cells: any[]): Table;
  addHeader(...cells: string[]): Table;
  addFooter(cells: string[], options?: { merge?: boolean }): Table;
  addSeparator(): Table;
  addSummary(cells: any[], options?: { merge?: boolean }): Table;
  render(): void;
}

export declare const TablePlugin: {
    (logsets:Logsets,options:DeepRequired<TablePluginOptions>):Table
}

export default TablePlugin
 