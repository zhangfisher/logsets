/**
 * 
 *  信息列表
 * 
 * 🚀 接下来需要干的事:📃
 *  |  dsdsdsdsdsdd
 *  |  dsdsdsdsdsddds 
 *  |  dsdsdsdsdsdd
 *  └─ dsdsdsdsdsdd 
 *  
 * 
 * 
 */

const consoleOutput = require("./utils").consoleOutput;
const {deepMerge} = require('flex-tools/object/deepMerge');
 
 const  DefaultListOptions = { 
    grouped: true,                                 // 是否启用分组
    groupSymbol : "♦",                             // 分组符号
    indent       : "",                             // 整体缩进
    showOrderNumber: false,                        // 是否显示序号
    title        : {
        emoji     :  "",                           // 默认的总结项图标
        style     : "bright",                      // 标题颜色
    },
    item:{
        indent       : "    ",
        type      : [ "√", "green" ],
        style     : [ "", "darkGray" ],
    }
 }
 
function createList(){
     const logsets = this      
     return { 
        show(title,items=[],options={}){ 
            const opts = deepMerge({},DefaultListOptions,options) 
            // 显示标题
            const colorizedTitle = logsets.getColorizer(opts.title.style)(logsets.getColorizedTemplate(title))
            consoleOutput(`${opts.indent} ${opts.title.emoji} ${colorizedTitle}`)
            // 显示总结项            
            items.forEach((item,index)=>{

                if(typeof(item)=='string' || Array.isArray(item)){
                    const [message,...args] = Array.isArray(item) ? item : [item]
                    logsets.log(
                        opts.indent
                        + opts.item.indent 
                        + (opts.grouped ? logsets.colors.darkGray(`${opts.groupSymbol}── `) : '') 
                        + logsets.colorizeString(message,"bright")
                    ,...args)                    
                }else{
                    const itemTitle = [opts.indent,opts.item.indent]
                    const itemData = Object.assign({
                        title: "",
                        style: opts.item.style,
                        type : opts.item.type,
                        emoji: opts.item.emoji,
                    },typeof(item)=='string' ? { title:item }: (Array.isArray(item) ? {title:item} : item ))
    
                    if(!Array.isArray(itemData.style)) itemData.style = [itemData.style,opts.item.style[1]]
                    if(itemData.style.length==1) itemData.style.push(opts.item.style[1])
                    if(!Array.isArray(itemData.type)) itemData.type = opts.item.type
                    if(itemData.type.length==1) itemData.type.push(opts.item.type[1])
    
                    if(!itemData) return
                    // 显示分组线
                    if(opts.grouped){                        
                        if(index==items.length-1 && !item.description){
                            itemTitle.push(logsets.colors.darkGray(`└─ `))
                        }else{
                            itemTitle.push(logsets.colors.darkGray(`│   `))
                        }                        
                    }
                    // 显示序号                
                    let order = `${String(index+1)}.`.padEnd(3)
                    if(opts.showOrderNumber) itemTitle.push(logsets.getColorizer(itemData.style[0])(order)+" ")
                    // 显示图标
                    itemTitle.push(logsets.getColorizer(itemData.type[1])(itemData.type[0] + " "))
                    // 显示标题               
                    itemTitle.push(logsets.getColorizer(itemData.style[0])(logsets.getColorizedTemplate(itemData.title)))
                    
                    consoleOutput(itemTitle.join(""))
    
                    // 显示描述信息
                    if(item.description){
                        const [memo,...args] = Array.isArray(item.description) ? item.description : [item.description]
                        const indent = " ".repeat(itemData.type[0].length + 1 + (opts.showOrderNumber ? order.length + 1 : 0))
                        memo.split("\n").forEach((line)=>{
                            consoleOutput(
                                 opts.indent                                
                                + opts.item.indent
                                + (opts.grouped ? 
                                    logsets.colors.darkGray(index==items.length-1 ? `└── ` : `│  `) 
                                    : ''
                                )
                                + indent
                                + logsets.getColorizedTemplate(logsets.getColorizer(itemData.style[1])(line),...args))
                        })
                    }
                }

                
            })            
        }
     }
 
 }
 
 
 
 
 
 /**
  * 
  * @param {*} logsets 
  * @param {*} context  当前上下文配置参数
  */
module.exports =  function(logsets,context){
    logsets.list = (title,items,options)=>createList.call(logsets,context).show(title,items,options)
}