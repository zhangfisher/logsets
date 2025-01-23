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
 * @param {*} logger 
 * @param {*} context  当前上下文配置参数
 */
module.exports = function(logger,context){
    logger.h = logger.header = (message,...args)=>{
        logger.log(logger.colorizeString(message,"bright,lightCyan"),...args)
    }    
}