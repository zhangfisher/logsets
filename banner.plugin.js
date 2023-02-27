/**
   
    用来显示一个横幅内容

   ╭──────────────────────────────────────────────────────────────────╮
   |                                 logsets                          │
   │   https://www.xxx.com                                            │
   │                                                                  │ 
   │                                                                  │
   ╰──────────────────────────────────────────────────────────────────╯

   const banner = logger.banner({})

   banner.add("logsets",{align:"center",style:"green"})
   banner.add("终端打印彩色输出工具",{align:"center",style:"green"})
   banner.add("https://www.xxx.com")
   banner.add("Version","1.0.0")
   bammern.add("Copyright",2019)
   banner.render()

   ═ ║ ╒ ╓ ╔ ╕ ╖ ╗ ╘ ╙ ╚ ╛ ╜ ╝ ╞ ╟ ╠ ╡ ╢ ╣ ╤ ╥ ╦ ╧ ╩ ╨ ╪ ╫ ╬ ╭ ╯ ╰

   ★☆

*/
import { consoleOutput, getLeftRepeatChars, getRightRepeatChars, getStringWidth, paddingCenter,paddingStart, paddingEnd } from "./utils.js"
import deepmerge from 'deepmerge' 

const  DefaultBannersOptions = { 
    indent       : " ",                          // 横幅缩进
    border       : {
        style    : "lightGray",                  // 边框颜色
        width    : 1                             // 边框宽度,0-不显示，1-单线框,2-双线框
    },
    title        : {
        align    : "center",                     // 标题对齐方式     
        style    : "green,bright",               // 标题颜色
        wrapper  : "--=="                         // 原本是使用☆ ☆ ☆标题包裹符号比较好看，但是 
    },
    align        : "center",                     // 横幅行默认对齐方式，默认居中
    paddingLeft  : 4,                            // 左右空白宽度
    paddingRight : 4,
    paddingTop   : 0,                            // 顶部空白行
    paddingBottom: 1
}

function createBanner(context,options){
    const logger = this 
    let opts = deepmerge(DefaultBannersOptions,options) 
    let lines = []  // [{text,style,align}] 
    function renderBanner(){
        // 计算最大行宽度
        const paddingLeft = new Array(opts.paddingLeft).fill(" ").join("")
        const paddingRight = new Array(opts.paddingRight).fill(" ").join("")
        let totalWidth = lines.reduce((width,line,index)=>{
            if(index===0){  // 第一行视为标题行
                line.text = `${opts.title.wrapper}  ${logger.colorizeString(line.text,opts.title.style)}  ${opts.title.wrapper.reverse()}`
            }
            return Math.max(width,getStringWidth(line.text))           
        },0) + opts.paddingLeft + opts.paddingRight
        if(typeof(opts.width)==="number" && opts.width > totalWidth){
            totalWidth = opts.width
        }

        // ╔═══════════╗        
        consoleOutput("╔"+new Array(totalWidth).fill("═").join("")+"╗")
        // 留出空白行
        new Array(opts.paddingTop).fill("").forEach(()=>{
            consoleOutput("║"+new Array(totalWidth).fill(" ").join("")+"║")
        })
        // 
        // ║           ║    line = {text:[],vars,align}

        lines.map((line,index)=>{
            let lineText = (line.text || "").trim()
            let coloredLineText = lineText
            let t = ""
            let leftSpace="",rightSpace=""
            if(lineText.trim()===""){
                leftSpace=new Array(totalWidth).fill(" ").join("")
            }else{
                coloredLineText = logger.getColorizedTemplate(lineText,line.vars)
                if(line.align==="left"){
                    t= paddingEnd(coloredLineText,totalWidth-opts.paddingLeft-opts.paddingRight)
                }else if(line.align==="right"){
                    t= paddingStart(coloredLineText,totalWidth-opts.paddingLeft-opts.paddingRight)
                }else{
                    t= paddingCenter(coloredLineText,totalWidth-opts.paddingLeft-opts.paddingRight)
                }
                leftSpace = paddingLeft + getLeftRepeatChars(t) + (index==0 ? "" : "")
                rightSpace= paddingRight + getRightRepeatChars(t) + (index==0 ? "" : "")
            }

            

            logger.print("║",leftSpace,coloredLineText,rightSpace,"║",{append:""}) 
            // 在标题栏下增加一行分割线╟ ─  ╢
            if(index===0){
                //consoleOutput("║"+new Array(totalWidth).fill(" ").join("")+"║")
                consoleOutput("╟"+new Array(totalWidth).fill("─").join("")+"╢")
            }
        })

        // 留出空白行
        new Array(opts.paddingBottom).fill("").forEach(()=>{
            consoleOutput("║"+new Array(totalWidth).fill(" ").join("")+"║")
        })
        // ╚═══════════╝
        consoleOutput("╚"+new Array(totalWidth).fill("═").join("")+"╝")
    }
    return { 
        add(text,vars={},options={}){ 
            lines.push({
                text,
                vars,
                ...options
            })
            return this
        },
        render:()=>{
            renderBanner()
        }
    }

}





/**
 * 
 * @param {*} logger 
 * @param {*} context  当前上下文配置参数
 */
 export default function(logger,context){
    logger.banner = (opts={})=>createBanner.call(logger,context,opts)
}