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
import { consoleOutput, getLeftRepeatChars, getRightRepeatChars, getStringWidth, isPlainObject, paddingCenter,paddingStart, paddingEnd } from "./utils.js"
import deepmerge from 'deepmerge'

const  DefaultBannersOptions = { 
    indent       : " ",                          // 横幅缩进
    border       : {
        style    : "lightGray",                  // 边框颜色
        width    : 1                             // 边框宽度,0-不显示，1-单线框,2-双线框
    },
    title        : {
        align    : "center",                     // 标题对齐方式     
        style    : ["","","green,bright","",""], // 标题颜色
        wrapper  : "☆☆☆"                       // ☆ ☆ ☆标题包裹符号,用来装饰 
    },
    align        : "center",                     // 横幅行默认对齐方式，默认居中
    paddingLeft  : 4,                            // 左右空白宽度
    paddingRight : 4,
    paddingTop   : 1,
    paddingBottom: 1
}

function createBanner(context,options){
    const logger = this 
    let opts = deepmerge(DefaultBannersOptions,options)
    const colorizer = logger.getColorizer 

    let lines = []  // [{text,style,align}] 
    function renderBanner(){
        // 计算最大行宽度
        const paddingLeft = new Array(opts.paddingLeft).fill(" ").join("")
        const paddingRight = new Array(opts.paddingRight).fill(" ").join("")
        let totalWidth = lines.reduce((width,line,index)=>{
            if(index===0){  // 第一行视为标题行
                line.text.splice(0,0,"  ")
                line.text.splice(0,0,opts.title.wrapper)
                line.text.push("  ")
                line.text.push(opts.title.wrapper)
            }
            return Math.max(width,getStringWidth(line.text.join("")))           
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
        // ║           ║    line = {text:[],style,align}

        lines.map((line,index)=>{
            let lineText = line.text.join("")
            let t = ""
            let leftSpace="",rightSpace=""
            if(lineText.trim()===""){
                leftSpace=new Array(totalWidth).fill(" ").join("")
            }else{
                if(line.align==="left"){
                    t= paddingEnd(lineText,totalWidth-opts.paddingLeft-opts.paddingRight)
                }else if(line.align==="right"){
                    t= paddingStart(lineText,totalWidth-opts.paddingLeft-opts.paddingRight)
                }else{
                    t= paddingCenter(lineText,totalWidth-opts.paddingLeft-opts.paddingRight)
                }
                leftSpace = paddingLeft + getLeftRepeatChars(t) + (index==0 ? "" : "")
                rightSpace= paddingRight + getRightRepeatChars(t) + (index==0 ? "" : "")
            }
            
            let lineStyles =Array.isArray(line.style) ? line.style : (line.style ? [line.style] : [])
            if(lineStyles.length===0 && index===0) lineStyles = opts.title.style

            const coloredLineTexts =lineStyles.length==0 ?  line.text : line.text.map((t,i)=>{
                return colorizer(i<lineStyles.length ?  lineStyles[i] : lineStyles[lineStyles.length-1])(t)
            })
            logger.print("║",leftSpace,...coloredLineTexts,rightSpace,"║",{append:""}) 
            // 在标题栏下增加一行分割线╟ ─  ╢
            // if(index===0){
            //     //consoleOutput("║"+new Array(totalWidth).fill(" ").join("")+"║")
            //     consoleOutput("╟"+new Array(totalWidth).fill("─").join("")+"╢")
            // }
        })

        // 留出空白行
        new Array(opts.paddingBottom).fill("").forEach(()=>{
            consoleOutput("║"+new Array(totalWidth).fill(" ").join("")+"║")
        })
        // ╚═══════════╝
        consoleOutput("╚"+new Array(totalWidth).fill("═").join("")+"╝")
    }

    function getLineFromArgs(){ 
        let linOptions = {align:opts.align,style:""}
        let text = []
        if(arguments.length>1 && isPlainObject(arguments[arguments.length-1])){
            Object.assign(linOptions,arguments[arguments.length-1])
            text = [...arguments].slice(0,-1)
        }else{
            text = [...arguments]
        } 
        return {text,...linOptions}
    }
    return {
        addTitle(text,options={}){  
            lines.splice(0,0,getLineFromArgs(...arguments)) 
        },
        // add(text,options={}) add([text,text,text])
        add(){ 
            lines.push(getLineFromArgs(...arguments))
        },
        render:()=>{
            renderBanner()
        }
    }

}
/**
 * 
 * @param {*} log 
 * @param {*} context  当前表格的上下文配置参数
 */
 export default function(logger,context){
    logger.banner = (opts={})=>createBanner.call(logger,context,opts)
}