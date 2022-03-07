/**
 *  显示列表
 *   
 *  import createLogger from "logsets"
 *  import treePlugin from "logsets/plugin/tree"
 *  const logger = createLogger({...})
 *  logger.use(treePlugin)
 *  
 *  tree = logger.tree({
 *      root: "根节点",
 *      
 *      symbol:"-",                 // 节点符号
 *      lineStyle:true,             // 是否显示树形结构线,0-不显示，1-显示
 *      render:"immediate",         // 渲染模式,immediate=实时渲染,manual=手动调用render渲染
 * ",
 *  })
 *  tree.addNode("item1")           // 添加节点备注
 *  tree.addNode("item1",111)
 *  tree.addNode("item1") 
 *  tree.beginChildren()           // 增加子列表
 *      tree.addNode("item2")
 *      tree.addNode("item2")
 *  tree.endChildren()
 *  
 *  tree.render()          // 当options.render="once"时,只会渲染一次
 * 
 * 
   ╭──────────────────────────────────────────────────────────────────╮
   |                                                                  │
   │                                                                  │
   │                                                                  │
   │                                                                  │
   │                                                                  │
   │                                                                  │
   │                                                                  │
   ╰──────────────────────────────────────────────────────────────────╯

 */



const DefaultTreeOptions  = {
    root: "Root",    
    symbol:"-",                 // 节点符号
    indent:"  ",                // 缩进字符
    lineStyle:0,                // 是否显示树形结构线,0-不显示，1-显示
    render:"immediate",         // 渲染模式,immediate=实时渲染,manual=手动调用render渲染    
    node:{                      // 默认节点配置
        style:"",               // 节点文本样式
        symbol:"-",             // 节点符号
        symbolStyle:""          // 节点符号样式
    }     
} 


const symbols = "√×●"

function createTree(context,options){
    const logger = this 
    let opts = deepmerge(DefaultTreeOptions,options)
    let curLevel = 0            // 当前节点

    let curNodeOptions = opts.node     // 当前节点配置


    return {
        addNode(){
            symbol = options.symbol || symbol
            logger.log(symbol,content)
        },
        beginChildren(){
            curLevel++
        },
        endChildren(){
            curLevel--
            if(curLevel===0) curLevel=0
        },
        render(){

        },
    }



}
/**
 * 
 * @param {*} log 
 * @param {*} context  当前表格的上下文配置参数
 */
 export default function(logger,context){
    logger.tree = (opts)=>createTree.call(logger,context,opts)
}