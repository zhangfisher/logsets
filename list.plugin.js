 
/**
import createLogger from "coloredLogger"
import progressbar from "logsets/plugins/progressbar"" 
const logger = createLogger({...})
logger.use(progressbar)

const list = logger.list({
    type: 0 ,               // normal,infinite ,greedySnake 
    max: 100,
    min: 0,
    dispaly:"",             // none, value, percent, text 
    width: 80,
})
 

 */

import deepmerge from 'deepmerge'
 

const DefaultListOptions  = { 
    title     : "",       // 显示标题     
    indent    : "  "  
    status:{   
        default:{
            style:"darkGrey",
            text:"white",
            char:"-",
        },        
        complete:{
            style:"",
            char:"✔️"
        },
        error:{
            style:"",
            char:"❌",            
        }
    }  
}

  
function createList(context,options){
    const logger = this  
    opts = deepmerge(DefaultListOptions,options) 
  

    return {
        add(text,status){
            
        }
    }
}
/**
 * 
 * @param {*} log 
 * @param {*} context  当前表格的上下文配置参数
 */
 export default function(logger,context){
    logger.progressbar = (opts)=>createProgressbar.call(logger,context,opts)
}
 