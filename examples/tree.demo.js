const logsets = require("../src/")
 
 
const tree = logsets.tree({
    root:"文件结构",
    note:{
        enable:true
    }
})

tree.addNode("readme.md",{note:logsets.colors.green("√")})
    .addNode("package.json",{note:logsets.colors.green("√")})
    .addNode("个人简历.doc",{note:logsets.colors.green("√")})
    .addNode("网络组网方案.docx",{note:logsets.colors.green("√")})
    .addNode("工资清单.xlsx",{note:logsets.colors.green("√")}) 
    .addNode("<src>",{style:"yellow",note:logsets.colors.red("×")}) 
        .beginChildren() 
            .addNode("readme.md")
            .addNode("package.json")
            .addNode("个人简历.doc")
                .beginChildren() 
                .addNode("readme.md")
                .addNode("package.json",{note:logsets.colors.red("×")})
                .addNode("个人简历.doc",{note:"已审核"})
                .addNode("网络组网{#red 方案}.docx")
                .addNode("工资清单.xlsx",{last:true}) 
                .endChildren() 
            .addNode("网络组网方案.docx")
            .addNode("工资清单.xlsx",{last:true}) 
        .endChildren() 
    .addNode("网络组网方案.docx")
    .addNode("工资清单.xlsx",{last:true})     
  


