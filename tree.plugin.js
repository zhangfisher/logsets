/**
 *  显示列表
 *   
 *  import createLogger from "logsets"
 *  import treePlugin from "logsets/plugin/tree"
 *  const logger = createLogger({...})
 *  logger.use(treePlugin)
 *  
 *  tree = logger.tree({
 *      root: "根节点", *      
 *      symbol:"-",                 // 节点符号
 *      lineStyle:true,             // 是否显示树形结构线,0-不显示，1-显示
 *      render:"immediate",         // 渲染模式,immediate=实时渲染,manual=手动调用render渲染
 *      note:{
 *         style:""                 // 备注样式
 *      }
 * ",
 *  })
 *  tree.addNode("item1",{style:"",note:""})           // 添加节点备注
 *  tree.addNode("item1","123Bytes")
 *  tree.addNode("item1") 
 *  tree.beginChildren()           // 增加子节点
 *      tree.addNode("item2")
 *      tree.addNode("item2")
 *  tree.endChildren()
 *  
 *  tree.render()          // 当options.render="once"时,只会渲染一次
 *  
 *  ROOT
 *  ├── base.json........................................备注
 *  ├── package.json.....................................124Bytes
 *  ├── README.md........................................124Bytes
 *  |   ├── base.json....................................124Bytes
 *  |   ├── package.json
 *  |   ├── README.md
 *  |   |   ├── README.md
 *  |   |   ├── base.json
 *  |   |   ├── package.json
 *  |   |   ├── README.md
 * 


 */

import { consoleOutput, getStringWidth } from "./utils.js"
import deepmerge from 'deepmerge'



const DefaultTreeOptions  = {
    root: "Root",    
    width: 60,                      // 当显示备注信息时，树的总宽度
    indent:" ",                     // 缩进字符
    node:{
        style:"white",                   // 默认节点样式
    },
    note:{                          // 节点备注
        enable:false,
        style:"darkGrey",               // 文本样式
        char:".", 
    }     
} 


//const symbols = "√×●"

function createTree(context,options){
    const logger = this 
    let opts = deepmerge(DefaultTreeOptions,options)
    const colorizer = logger.getColorizer
    let curLevel = 0                  // 当前层级

    function renderRoot(){
        consoleOutput(colorizer("bright")(`${opts.indent}${opts.root}`))
        curLevel++
    }
    function renderNode(text,options={}){ 
        const {style,last} =Object.assign({},opts.node,options)
        const levelsIndent = new Array(curLevel-1).fill("│   ").join("")
        const treeLine =last ? "└── " : "├── "
        let note =  options.note || ""
        const coloredText = logger.getColorizedTemplate(text)
        if(opts.note.enable){
            const noteOffset = opts.width - levelsIndent.length - treeLine.length - getStringWidth(coloredText) 
            note = colorizer("darkGray")(new Array(noteOffset).fill(opts.note.char).join("")) + colorizer(opts.note.style)(note)
        }else{
            note=""
        }
        consoleOutput(`${opts.indent}${levelsIndent}${treeLine}${colorizer(style)(coloredText)}${note}`)
    }
    renderRoot()
    return {
        addNode(text,options={}){ 
            renderNode(text,options)
        },
        beginChildren(){
            curLevel++
        },
        endChildren(){
            curLevel--
            if(curLevel===0) curLevel=0
        }
    }



}
/**
 * 
 * @param {*} log 
 * @param {*} context  当前上下文配置参数
 */
 export default function(logger,context){
    logger.tree = (opts={})=>createTree.call(logger,context,opts)
}