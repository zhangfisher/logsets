import createLogger from "./index.js" 
import  tablePlugin from "./table.plugin.js" 

const logger = createLogger()
logger.use(tablePlugin)
logger.print(/^colored$/g)

logger.colors.red("hello")

// logger.print("I am very cool!",true,3,[1,2,3,4],"Voerka",{a:1,b:2},null,undefined,[{a:1}])

// logger.log("I am {}, age is {}","voerka",1,true,null)
// logger.log("{a} + {b} == 3 {a} ",{a:1111,b:2})
const t= new Date()
function getUserInfo(){
    console.logger.log("getUserInfo")
}
class MyError extends Error {
    constructor(message) {
        super(message) 
    }
}
async function delay(n=100){
    return new Promise(resolve=>{
        setTimeout(resolve,n)
    })
}


logger.log("------------")
for(let i = 0 ; i < 100; i++){
    await delay(10)
    logger.print("已下载",i,"%",{end:"\r"})
}
logger.print("")
logger.log("------------")

// logger.print({posts:["a","b"],values:[1,2,3],z:()=>{}})
logger.print({z:()=>{}})

logger.log("{a}+{b}={c}",{a:1,b:1,c:2})
logger.log("My name is {}","tom")
logger.log("{a}+{b}={c}",{a:1,b:1,c:2})

logger.print("String",true,100,()=>{},[1,2,3])
logger.print(null,undefined)
logger.print(/^colored$/g)
logger.print(new Error("Value Error"))
logger.print(new Date())  
logger.print(class A{})
logger.print(new (class User{})())
logger.print({name:"tom",age:100,admin:true,posts:["a","b"],values:[1,2,3]},()=>"hello")

logger.format("{a}+{b}={c}",{a:1,b:1,c:2})

logger.log("My name is {}", "Voerka")
logger.log("My name is {}, age is {}", "Voerka", 1)
logger.log("{a}+{b}={c}", {a:1,b:2,c:3})
logger.print({numbers:[1,2,3,4,5,6,7,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,7,1,1,1,1,1,1,1,1,1,1,1,1], fooc: true, barops: 42,seescvx:"mass",x:null,y:undefined,z:()=>{},reg:/^12323$/,obj:{
    x:1,y:2,z:[1,2,3,4,5,6,7,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,7,1,1,1,1,1,1,1,1,1,1,1,1]
}})


logger.format({
    values:new Array(10).fill(0).map((v,i)=>i+1),
    users:{
        tom:{name:"tom",age:21,sex:true},
        jack:{name:"jack",age:21,sex:false}, 
        jack1:{name:"jack",age:21,sex:false}, 
        jack2:{name:"jack",age:21,sex:false}, 
        jack3:{name:"jack",age:21,sex:false}, 
        jack4:{name:"jack",age:21,sex:false}, 
        jack5:{name:"jack",age:21,sex:false}, 
        jack6:{name:"jack",age:21,sex:false}, 
        jack7:{name:"jack",age:21,sex:false}, 
        jack8:{name:"jack",age:21,sex:false}, 
        jack9:{name:"jack",age:21,sex:false}, 
        jack10:{name:"jack",age:21,sex:false}, 
        jack11:{name:"jack",age:21,sex:false}, 
        jack12:{name:"jack",age:21,sex:false}, 
    }
},{Array:{maxItems:5},Object:{maxItems:5}})



logger.format({
    name:"tom",
    age:11,
    admin:true,
    posts:["经理","主任"],
    addtrss:{
        company:"中华人民共和国北京市二环路",
        family:"福建省泉州市惠安路1512号"
    }
})

// const o1={asks:{ price: "2000", amt: 10 } ,
// bids: [ { price: "500", amt: 10 },
// { price: "100", amt: 10 }  ] ,
// time:t ,error:new MyError("BCXCCC"),callback:getUserInfo }

// logger.log(o1)



 



logger.config({
    Object:{maxItems:5,compact:true}
}).format({
    users:{
        tom:{name:"tom",age:21,sex:true},
        jack:{name:"jack",age:21,sex:false}, 
        jack1:{name:"jack",age:21,sex:false}, 
        jack2:{name:"jack",age:21,sex:false}, 
        jack3:{name:"jack",age:21,sex:false}, 
        jack4:{name:"jack",age:21,sex:false}, 
        jack5:{name:"jack",age:21,sex:false}, 
        jack6:{name:"jack",age:21,sex:false}, 
        jack7:{name:"jack",age:21,sex:false}, 
        jack8:{name:"jack",age:21,sex:false}, 
        jack9:{name:"jack",age:21,sex:false}, 
        jack10:{name:"jack",age:21,sex:false}, 
        jack11:{name:"jack",age:21,sex:false}, 
        jack12:{name:"jack",age:21,sex:false}, 
    },
    number:100,
    bool:true,
    nil:null,
    empty:undefined,
    string:new Array(109).fill("hello").map((v,i)=>(i+1)).join("="),
    array:new Array(109).fill(0).map((v,i)=>(i+1)),
    error:new MyError("File does not exists")
})


logger.debug("正在执行程序{},还需要{}秒...",["logs",9])
logger.info("正在执行程序{app},还需要{time}秒...",{app:"logs",time:9})
logger.warn("正在执行程序{app},还需要{time}秒...",{app:"logs",time:9},"Line:123")
logger.warn("程序执行可能出错\n变量没有定义")
logger.error("程序执行可能出错\n变量没有定义")
logger.fatal("执行程序{a} + {b}发生致命错误",{a:1,b:1})

logger.warn("My name is {name}, age is {age}",()=> ({name:"Voerka",age:1}))

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
 