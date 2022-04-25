import { darkGray } from "ansicolor"

import {trimEndChars } from "./utils.js"
// 'foreground colors'
//     .red.green.yellow.blue.magenta.cyan.white.darkGray.black
// 'light foreground colors'
//     .lightRed.lightGreen.lightYellow.lightBlue.lightMagenta.lightCyan.lightGray
// 'background colors'
//     .bgRed.bgGreen.bgYellow.bgBlue.bgMagenta.bgCyan.bgWhite.bgDarkGray.bgBlack
// 'light background colors'
//     .bgLightRed.bgLightGreen.bgLightYellow.bgLightBlue.bgLightMagenta.bgLightCyan.bgLightGray
// 'styles'
//     .bright.dim.italic.underline.inverse // your platform should support italic

export const DefaultOptions ={
    indent: "  ",                                           // 缩进
    singleQuotes: false,                                    // 显示单引号 
    template: "[{level}] {datetime} - {message}",           // 模板
    compact:false,                                          // 是否采用紧凑模式输出
    Array:{
        maxItems: 100,                                      // 数组最大长度，超过则显示省略号
        memo    : (value)=> darkGray("(共"+value.length+"项)")                         // 当数组数量超过maxItems时，显示共几项的备注
    },
    Object:{
        maxItems:100,                                       // 成员数量，超过则显示省略号
        align:true,                                         // 是否自动对齐
        memo:(value)=> darkGray("(共"+value.length+"项)"),
    },
    Function : {
        style:"lightCyan",
        format:value=>value.name ? `[Function ${value.name}]` : "()=>{...}"
    },
    AsyncFunction: {
        style:"lightCyan",
        format:value=>value.name ? `[AsyncFunction ${value.name}]` : "async ()=>{...}"
    },
    Error    : {
        style:"red",
        format:e=>`${e.name.firstUpper()}('${e.message}')`
    },
    Null     : "darkGray",
    Undefined: "darkGray",
    Boolean  : "cyan",
    Number   : "yellow",
    String   : "green", 
    Class    : {
        style:"lightCyan",
        format:value=>`[Class ${value.name}]`
    },
    Instance : {
        style:"lightBlue",
        format:value=>`<${value.constructor.name.firstUpper()}()>`
    },
    Date     : {
        style:"lightBlue",
        format:(value)=>`${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`
    },
    Symbol   : "blue", 
    RegExp   : {
        style:"magenta",
        format:(value)=>`${value.toString()}`
    },
    levels   :{
        align: true,                                        // 是否自动对齐消息
        maxLineChars  : 90,                                 // 每行最大字符数 
        memo     : "darkGray",
        debug    : "lightGray",
        info     : "dim",
        warn     : "yellow",
        error    : "red",
        fatal    : "red"
    } 
}