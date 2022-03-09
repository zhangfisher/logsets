import createLogger from "./index.js" 
import treePlugin from "./tree.plugin.js" 

const logger = createLogger()
logger.use(treePlugin)
 
const tree = logger.tree({
    title:"文件结构",
    note:{
        visible:false
    }
})

tree.addNode("readme.md")
tree.addNode("package.json")
tree.addNode("个人简历.doc")
tree.addNode("网络组网方案.docx")
tree.addNode("工资清单.xlsx") 
tree.addNode("<src>",{style:"yellow"}) 
tree.beginChildren() 
tree.addNode("readme.md")
tree.addNode("package.json")
tree.addNode("个人简历.doc")
tree.addNode("网络组网方案.docx")
tree.addNode("工资清单.xlsx") 