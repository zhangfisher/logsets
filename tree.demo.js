import createLogger from "./index.js" 
import treePlugin from "./tree.plugin.js" 

const logger = createLogger()
logger.use(treePlugin)
 
const tree = logger.tree({
    root:"文件结构",
    note:{
        enable:true
    }
})

tree.addNode("readme.md",{note:logger.colors.green("√")})
tree.addNode("package.json",{note:logger.colors.green("√")})
tree.addNode("个人简历.doc",{note:logger.colors.green("√")})
tree.addNode("网络组网方案.docx",{note:logger.colors.green("√")})
tree.addNode("工资清单.xlsx",{note:logger.colors.green("√")}) 
tree.addNode("<src>",{style:"yellow",note:logger.colors.red("×")}) 
    tree.beginChildren() 
        tree.addNode("readme.md")
        tree.addNode("package.json")
        tree.addNode("个人简历.doc")
            tree.beginChildren() 
            tree.addNode("readme.md")
            tree.addNode("package.json",{note:logger.colors.red("×")})
            tree.addNode("个人简历.doc",{note:"已审核"})
            tree.addNode("网络组网方案.docx")
            tree.addNode("工资清单.xlsx",{last:true}) 
            tree.endChildren() 
        tree.addNode("网络组网方案.docx")
        tree.addNode("工资清单.xlsx",{last:true}) 
    tree.endChildren() 
tree.addNode("网络组网方案.docx")
tree.addNode("工资清单.xlsx",{last:true})     