
export interface BannerPluginOptions  { 
    indent?       : string                          // 横幅缩进
    border?       : {
        style?    : string                          // 边框颜色
        width?    : 0 | 1 | 2                       // 边框宽度,0-不显示，1-单线框,2-双线框
    },
    title?       : {
        align?   : 'left' | 'center' | 'right'      // 标题对齐方式     
        style?   : string                           // 标题颜色
        wrapper? : string                           // 原本是使用☆ ☆ ☆标题包裹符号比较好看，但是 
    },
    align?        : 'left' | 'center' | 'right'     // 横幅行默认对齐方式，默认居中
    paddingLeft?  : number                           // 左右空白宽度
    paddingRight? : number
    paddingTop?   : number                           // 顶部空白行
    paddingBottom?: number
}
 
export interface Banner{
    add(text:string,vars?:any[] | Record<string>,options?:BannerPluginOptions):void
    render():void
}

export declare const BannerPlugin: {
    (logsets:Logsets,options:DeepRequired<BannerPluginOptions>):Banner
}

export default BannerPlugin
 