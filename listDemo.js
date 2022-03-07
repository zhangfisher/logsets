import createLogger from "./index.js" 
import  listPlugin from "./tree.plugin.js" 

const logger = createLogger()
logger.use(tablePlugin)
 
  