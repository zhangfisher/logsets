/**
import createLogger from "coloredLogger"
import progressbar from "logsets/plugins/progressbar"" 
const logger = createLogger({...})
logger.use(progressbar)

const progressbar = logger.progressbar({})


progressbar.begin()
progressbar.value()
progressbar.end()


 */
const DefaultTreeOptions  = { 
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