import logsets from "./index.js" 
 
logsets.print(/^colored$/g)

logsets.colors.red("hello")

// logsets.print("I am very cool!",true,3,[1,2,3,4],"Voerka",{a:1,b:2},null,undefined,[{a:1}])

// logsets.log("I am {}, age is {}","voerka",1,true,null)
// logsets.log("{a} + {b} == 3 {a} ",{a:1111,b:2})
const t= new Date()
function getUserInfo(){
    console.logsets.log("getUserInfo")
}
class MyError extends Error {
    constructor(message) {
        super(message) 
    }
}
async function delay(n=50){
    return new Promise(resolve=>{
        setTimeout(resolve,n)
    })
}


logsets.log("------------")
for(let i = 0 ; i < 100; i=i+10){
    await delay(10)
    logsets.print("已下载",i,"%",{end:"\r"})
}
logsets.print("")
logsets.log("------------")

// logsets.print({posts:["a","b"],values:[1,2,3],z:()=>{}})
logsets.print({z:()=>{}})

logsets.log("{a}+{b}={c}",{a:1,b:1,c:2})
logsets.log("My name is {}","tom")
logsets.log("{a}+{b}={c}",{a:1,b:1,c:2})
logsets.log("位置参数插值:{a}+{b}={c}",1,2,3)
logsets.log("指定颜色{#red a}+{#bgGreen,bgLightYellow b}={c} {x}",{a:1000,b:12222,c:2,x:"HELLO"})
logsets.log("Welcome to {#red VoerkaI18n}")


logsets.print("String",true,100,()=>{},[1,2,3])
logsets.print(null,undefined)
logsets.print(/^colored$/g)
logsets.print(new Error("Value Error"))
logsets.print(new Date())  
logsets.print(class A{})
logsets.print(new (class User{})())
logsets.print({name:"tom",age:100,admin:true,posts:["a","b"],values:[1,2,3]},()=>"hello")

logsets.format("{a}+{b}={c}",{a:1,b:1,c:2})

logsets.log("My name is {}", "Voerka")
logsets.log("My name is {}, age is {}", "Voerka", 1)
logsets.log("{a}+{b}={c}", {a:1,b:2,c:3})
logsets.print({numbers:[1,2,3,4,5,6,7,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,7,1,1,1,1,1,1,1,1,1,1,1,1], fooc: true, barops: 42,seescvx:"mass",x:null,y:undefined,z:()=>{},reg:/^12323$/,obj:{
    x:1,y:2,z:[1,2,3,4,5,6,7,1,1,1,1,1,1,1,1,1,1,1,1,1,5,6,7,1,1,1,1,1,1,1,1,1,1,1,1]
}})


logsets.format({
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



logsets.format({
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

// logsets.log(o1)



 



logsets.config({
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


logsets.debug("正在执行程序{},还需要{}秒...",["logs",9])
logsets.info("正在执行程序{app},还需要{time}秒...",{app:"logs",time:9})
logsets.warn("正在执行程序{app},还需要{time}秒...",{app:"logs",time:9},"Line:123")
logsets.warn("程序执行可能出错\n变量没有定义")
logsets.error("程序执行可能出错\n变量没有定义")
logsets.fatal("执行程序{a} + {b}发生致命错误",{a:1,b:1})

logsets.warn("My name is {name}, age is {age}",()=> ({name:"Voerka",age:1}))

let table = logsets.table({
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
  


table = logsets.table({
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
 


const tree = {
    "arrays.js": {
      lasModifyTime: 1650854060803,
      buildTime: 1650873807693,
    },
    "asyncSignal.js": {
      lasModifyTime: 1642384454095,
      buildTime: 1650873808220,
    },
    "asyncStateMachine.js": {
      lasModifyTime: 1650853827230,
      buildTime: 1650873808755,
    },
    "buffers.js": {
      lasModifyTime: 1642384454370,
      buildTime: 1650873809044,
    },
    "classes.js": {
      lasModifyTime: 1650447265223,
      buildTime: 1650873809255,
    },
    "dataConsumer.js": {
      lasModifyTime: 1650867353119,
      buildTime: 1650873809564,
    },
    "dataqueue.js": {
      lasModifyTime: 1642384454530,
      buildTime: 1650873809748,
    },
    "deviceInfo.android.js": {
      lasModifyTime: 1642384454604,
      buildTime: 1650873809863,
    },
    "deviceInfo.js": {
      lasModifyTime: 1642384454677,
      buildTime: 1650873810012,
    },
    "dicts.js": {
      lasModifyTime: 1650356961062,
      buildTime: 1650873810283,
    },
    "enum.js": {
      lasModifyTime: 1642384454844,
      buildTime: 1650873810388,
    },
    "envs.js": {
      lasModifyTime: 1650773039369,
      buildTime: 1650873810475,
    },
    "flexArgs.js": {
      lasModifyTime: 1642384454943,
      buildTime: 1650873810566,
    },
    "funcs.js": {
      lasModifyTime: 1650854008034,
      buildTime: 1650873810714,
    },
    "hook.js": {
      lasModifyTime: 1642384455098,
      buildTime: 1650873810784,
    },
    "index.js": {
      lasModifyTime: 1642384455158,
      buildTime: 1650873810863,
    },
    "iterator.js": {
      lasModifyTime: 1642384455319,
      buildTime: 1650873810925,
    },
    "multiplex.js": {
      lasModifyTime: 1650854079018,
      buildTime: 1650873811116,
    },
    "schema.js": {
      lasModifyTime: 1642384455695,
      buildTime: 1650873811207,
    },
    "session.js": {
      lasModifyTime: 1642384455761,
      buildTime: 1650873811350,
    },
    "snowflake.js": {
      lasModifyTime: 1642384455818,
      buildTime: 1650873811412,
    },
    "statedPromise.js": {
      lasModifyTime: 1642384455884,
      buildTime: 1650873811512,
    },
    "timer.js": {
      lasModifyTime: 1650436530905,
      buildTime: 1650873811601,
    },
    "tree.js": {
      lasModifyTime: 1642384456218,
      buildTime: 1650873811706,
    },
    "typeCheck.js": {
      lasModifyTime: 1650856845095,
      buildTime: 1650873811785,
    },
    "a\\index.js": {
      lasModifyTime: 1650856983600,
      buildTime: 1650873811865,
    },
  }


logsets.format(tree)

logsets.log("{#red a}+{b}={c}",{a:1,b:1,c:2})
// 位置插值变量
logsets.log("My name is {}","tom")
logsets.log("{a}+{b}={#bgGreen c}",1,1,2)

logsets.log("My name is {#red tom}")
logsets.log("{#blue Voerkai18n}是一个非常不错的{#red,dim 多语言}解决方案!")


console.log(logsets.getColorizedTemplate("My name is {}","zhang"))
logsets.config({
    String:"yellow",
    levels:{
        memo     : "red",
        debug    : "red",
        info     : "red",
        warn     : "red",
        error    : "red",
        fatal    : "red" 
    }
})
console.log(logsets.getColorizedTemplate("My name is {}","zhang"))



logsets.debug("正在执行程序{},还需要{}秒...",["logs",9])
logsets.info("正在执行程序{app},还需要{time}秒...",{app:"logs",time:9})
logsets.warn("正在执行程序{app},还需要{time}秒...",{app:"logs",time:9},"Line:123")
logsets.warn("程序执行可能出错\n变量没有定义")
logsets.error("程序执行可能出错\n变量没有定义")
logsets.fatal("执行程序{a} + {b}发生致命错误",{a:1,b:1})