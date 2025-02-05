/**
   
    用来显示一个横幅内容

   ╭──────────────────────────────────────────────────────────────────╮
   |                                 logsets                          │
   │   https://www.xxx.com                                            │
   │                                                                  │ 
   │                                                                  │
   ╰──────────────────────────────────────────────────────────────────╯

   const banner = logger.banner({})

 

*/
 /**
 * 
 * @param {*} logsets 
 * @param {*} context  当前上下文配置参数
 */
module.exports = function(logsets,context){
    logsets.h = logsets.header = (message,...args)=>{        
        logsets.log(logsets.colorizeString(logsets.getColorizedTemplate(message,...args),"bright,lightCyan"))
    }    
}