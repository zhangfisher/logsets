import createLogger from "./index.js" 
import  tablePlugin from "./table.plugin.js" 

const logger = createLogger()
logger.use(tablePlugin) 

let table = logger.table({
    colorize:1,
    grid:1,
})
table.addHeader("序号","文件名","大小","下载进度","完成","<备注")
table.addRow(1,"readme.md",58713,100,true,"自述文件")
table.addRow(2,"index.js",1222,100,true,"源代码文件")
table.addSeparator()
table.addRow(3,"consts.js",45981,100,true,"常量定义\n包含默认的配置文件")
table.addRow(4,"table.plugin.js",434,100,true,"表格插件\n可选，用来输出表格")
table.addRow(5,"rollup.config.js",123,100,true,"构建配置文件")
table.addSummary(["已下载",5,"个文件\n累计耗时",56,"秒"],{align:"right"})
table.addRow(6,"colorize.js",6542,60,false,"实现对变量或对象进行着色")
table.addRow(7,"stringify.js",5546,34,false,"格式化JSON") 
table.addRow(8,"utils.js",6456,66,false,"一个工具函数") 
table.addFooter(["共",8,"个文件"])
table.render()
  


table = logger.table({
    colorize:1,
    grid:2,
    maxColWidth:12,                                    
})
table.addHeader("名称","性别","出生日期","<居住地址")
table.addRow("令狐冲","男","1653/12/2","思过崖","华山派")
table.addRow("东方不败","男","1603/6/3","日月神教无敌峰藏经阁")
table.addRow("任盈盈","女","1651/2/8","")  
table.addFooter([1,2,3,4],{merge:false})
table.render()
  