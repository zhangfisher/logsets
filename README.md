在终端输出带颜色的文本，支持以下特性：

- 支持按不同数据类型以不同的颜色显示，并且可以配置
- 支持按`DEBUG`、`INFO`、`WARN `、`ERROR `、`FATAL`五个级别输出日志
- 支持输出带颜色的模板字符串
- 支持自动格式化显示`{}`和`[]`类型
- 支持强大的表格输出

# 安装

```shell
npm install logsets
yarn add logsets
pnpm add logsets
```

# 指南

## 模板字符串输出

对模板字符串进行插值后输出着色后的字符串。

```javascript
    log("<模板字符串>",<变量1>,<变量1>,...,{end:"\n",append:" "})
    log("<模板字符串>",<变量1>,<变量1>,...)
    log("<模板字符串>",{<变量1>:<值>,<变量1>:<值>},)
    log("<模板字符串>",{<变量1>:<值>,<变量1>:<值>},{end:"\n",append:" "})
```
**输出配置参数：**
```javascript
{
    end:"\n",          // 行结束字符，默认是换行会导致打印下一行，如\r则不会换行而只是回到行首
    append:" "         // 每个输出参数自动追加的字符，默认是一个空格
}
```
**示例如下：**
```javascript
import createLogger from "logsets"
const logger = createLogger({...})
// 命名插值变量
logger.log("{a}+{b}={c}",{a:1,b:1,c:2})
// 位置插值变量
logger.log("My name is {}","tom")
logger.log("{a}+{b}={c}",1,1,2)
```
**输出效果如下：**

![image](./images/logger.jpg)


默认情况下，每次执行`log`方法完成后均会导致换行输出。`log`方法还支持配置输出参数:
```javascript
for(let i =0 ;  i<=100; i++){
  logger.log("正在下载:{}",i,{end:"\r"})          // 每行输出时最后打印\r回车符，回到行头，从而可以实现下载进度的更新。
}
logger.log()   // 换行
```
**配置参数**
当log的参数大于=2个并且最后一个参数是{}时，将最后一个参数视为是输出配置参数。


## 按数据类型输出

提供`print`方法，用来连续输出多个经过着色的参数。
```javascript
    print(arg1,arg2,arg3,.....)
    print(arg1,arg2,arg3,.....,{end:"\n",append:" "}) // 增加可选的输出参数
```
**输出配置参数：**

同`log`方法.

**示例**

```javascript
import createLogger from "coloredLogger"
const log = createLogger({...})

logger.print("String",true,100,()=>{},[1,2,3])
logger.print(null,undefined)
logger.print(/^colored$/g)
logger.print(new Error("Value Error"))
logger.print(new Date())  
logger.print(class A{})
logger.print(new (class X{})())
logger.print({name:"tom",age:100,admin:true,posts:["a","b"],values:[1,2,3]},()=>"hello")
```
输出效果如下：

![image](./images/log2.jpg)

## 格式化输出对象

提供`format`方法，用来带缩进格式和着色过的对象

- **基本用法**

```javascript
import createLogger from "coloredLogger"
const logger = createLogger({...})

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

```
输出效果如下：

![image](./images/log3.jpg)

- **优化数组和对象输出**

对数组或对象成员数量当超过指定值时，显示省略号并备注总数量。

```javascript
import createLogger from "coloredLogger"
const logger = createLogger({...})

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

```
`maxItems`参数用来指定只显示多少项，超出显示省略号并备注总数量。


输出效果如下：

![image](./images/log5.jpg)

**可以配置紧凑模式输出。**

```javascript
import createLogger from "coloredLogger"
const logger = createLogger({...})

logger.format({
    values:new Array(10).fill(0).map((v,i)=>i+1),
    users:{
        tom:{name:"tom",age:21,sex:true},
        ...,
        jack12:{name:"jack",age:21,sex:false}, 
    }
},{Array:{maxItems:5,compact:true},Object:{maxItems:5,compact:true}})

```
`compact`参数用来指示采用紧凑模式输出

输出效果如下：

![image](./images/log4.jpg)

## 输出日志级别

按指定级别输出日志，并会对插值变量进行着色。

```javascript
logger.debug("<模块字符串>",[位置插值变量列表] || {插值变量列表},"备注信息")
logger.info("<模块字符串>",[位置插值变量列表] || {插值变量列表},"备注信息")
logger.warn("<模块字符串>",[位置插值变量列表] || {插值变量列表},"备注信息")
logger.error("<模块字符串>",[位置插值变量列表] || {插值变量列表},"备注信息")
logger.fatal("<模块字符串>",[位置插值变量列表] || {插值变量列表},"备注信息")
```

示例如下：

```javascript
import createLogger from "coloredLogger"
const log = createLogger({...})
logger.debug("正在执行程序{},还需要{}秒...",["logs",9])
logger.info("正在执行程序{app},还需要{time}秒...",{app:"logs",time:9})
logger.warn("正在执行程序{app},还需要{time}秒...",{app:"logs",time:9},"Line:123")
logger.warn("程序执行可能出错\n变量没有定义")
logger.error("程序执行可能出错\n变量没有定义")
logger.fatal("正在执行程序{a} + {b} , {sex} {name}...",{a:1,b:1,sex:true,name:"voerka"})

```
输出效果如下：

![](./images/log11.jpg)

第二个参数也可以是一个返回`[]`或`{}`插值变量列表的函数.

```javascript
logger.warn("My name is {name}, age is {age}",()=> ({name:"Voerka",age:1}))
```

输出样式可以通过`template`参数配置模块字符串。 

```javascript
logger.config({
    template:"[{level}] {datetime} - {message}"
})
```

`template`支持以下插值变量：

- **level**：日志级别
- **datetime**：当前日期时间
- **date**：当前日期
- **time**：当前时间
- **message**：文本信息

## 表格输出

`logsets`支持额外引入`table`插件用来输出表格

### 基本用法 

```javascript
import createLogger from "coloredLogger"
import TablePlugin from "coloredLogger/plugins/table"

const log = createLogger({...})
logger.use(TablePlugin)

const table = logger.table({       
    colorize:1,              // 是否需要颜色化 0-禁用着色,1-简单着色 2-对表单元里面的对象和数组进行着色,需要额外的计算
    grid:2,                  		// 表格线样式,0=不显示表格线,1=只显示垂直表格线,2=显示完整表格线
    maxColWidth:32,          		// 最大列宽,超过会显示省略号
    colPadding:" ",          		// 列额外的空格
    header:{
        style:"bright"       		// 表头颜色样式，默认高亮 
    },                                    
    footer:{
        style:"darkGray",    		// 表尾颜色样式                 
        merge:true           		// 是否合并行
        align:"right",       		// 当合并时对齐方式
    },
    summary:{                		// 默认汇总行配置
        style:"yellow,bright",    	// 汇总颜色样式
        align:"right",            	// 汇总对齐方式
    },   
})
// 输出表头，只支持一个表头
table.addHeader("序号","文件名","大小","下载进度","完成","<备注")
// 输出行，一个参数对应一列
table.addRow(1,"readme.md",58713,100,true,"自述文件")
table.addRow(2,"index.js",1222,100,true,"源代码文件")
table.addRow(3,"consts.js",45981,100,true,"常量定义\n包含默认的配置文件")
table.addRow(4,"table.plugin.js",434,100,true,"表格插件\n可选，用来输出表格")
table.addRow(5,"rollup.config.js",123,100,true,"构建配置文件")
// 输出汇总行
table.addSummary(["已下载",5,"个文件\n累计耗时",56,"秒"],{align:"right"})
table.addRow(6,"colorize.js",6542,60,false,"实现对变量或对象进行着色")
table.addRow(7,"stringify.js",5546,34,false,"格式化JSON") 
table.addRow(8,"utils.js",6456,66,false,"一个工具函数") 
// 输出表尾
table.addFooter(["共",8,"个文件"])
// 渲染输出
table.render()
```

输出效果如下：

![image](./images/log6.jpg)

### 控制表格线样式 

当`grid=1`时，输出效果如下：

![image](./images/log7.jpg)


当`grid=2`时，输出效果如下：

![image](./images/log8.jpg)

### 单元格着色

`table.addRow`进行增加行时，会根据`logsets` 全局配置按不同的数据类型显示不同的颜色。

### 单元格里显示着色对象

默认情况下，在单元格里面显示`{...}`或`[...]`时会将之转化为字符串进行显示，而不是像`format`方法一样进行格式化关色后输出。需要额外配置`colorize=2`才会进行着色输出。

```javascript
table = logger.table({  
   colorize:2,    
})
```

colorize参数用来控制是否对单元格内容进行着色。

- **0 :** 禁用着色输出
- **1 :** 对简单数据类型进行着色，默认值
- **2** ：对表单元里面的对象和数组进行着色,需要额外的计算   

### API

table实例具有以下方法：

#### addHeader 
 增加表头，一个表格只能指定一个表头，并且表头不支持多行标题。

```javascript
addHeader("列标题","列标题",......,"列标题")
```

列标题**默认居中显示**，指定列标题时可以通过第一个字符来指定该列的显示对齐方式。如:

```javascript
addHeader("序号","名称",">地址")          // 地址列右对齐
addHeader("序号","名称","<地址")          // 地址列左对齐
```

#### addRow 

表格支持添加任意多的普通表行。

```javascript
addRow(<单元格内容>,<单元格内容>,...,<单元格内容>)
```

一般情况下，单元格的数量应该与`addHeader`中列数量一致。如果`addRow`的参数个数大于`addHeader`的参数个数，会自动扩展列，取最大的列数量进行显示。

```javascript
table = logger.table({ 
    grid:2,
    maxColWidth:12,                                    
})
// 表头定义了4列
table.addHeader("名称","性别","出生日期","<居住地址")
// 该行提供了5个单元格参数
table.addRow("令狐冲","男","1653/12/2","思过崖","华山派")
table.addRow("东方不败","男","1603/6/3","日月神教无敌峰藏经阁")
table.addRow("任盈盈","女","1651/2/8","")  
table.render()
```

- 渲染单元格时会按照配置中指定的样式，分别对不同的数据类型显示不同的颜色。

- 表格行每一列会根据内容自适应宽度显示，但是其最大值受配置参数中的`maxColWidth`约束，当单元格内容字符宽度超过`maxColWidth`时会显示省略号。效果如下：

    ![](./images/log9.jpg)

#### addSummary 
增加汇总行，汇总行用来合并所有单元格并显示内容。

```javascript
addSummary(
    content,                          // 单元格内容
    {
  		style:"yellow,bright",        // 汇总颜色样式
    	align:"right",                // 汇总对齐方式，取值:left,auto,center,right
	})
```

- `content`参数可以是一个字符串，其显示颜色样式由style指定，默认值是`yellow,bright`

- `content`参数也可以是一个Array，其显示颜色样式会根据数组成员的数据类型进行着色。

    效果图参阅上文。

#### addFooter 
增加表尾，一个表格只能显示一个表尾。


```javascript
addFooter(content,
   {
    style:"darkGray",      // 表尾颜色样式 ,当merge=false时生效
    merge:<true/false>,   // 是否合并行显示,默认true
    align:"left",		  // 对齐方式，取值:left,auto,center,right
    style:""
})
```

- `content`参数用法与`addSummary` 一样。

- 表尾支持可以通过`{merge:<true/false>}`来配置是否合并显示或者分列显示。如`addFooter([1,2,3,4],{merge:false})`  

    ![](./images/log10.jpg)

- 默认情况下`merge=true`，即`addFooter("内容")===addFooter("内容",{merge:true})`。

#### addSeparator

当`grid=0`或`grid=1`即不显示网格线时用来增加一条分割线。

```javascript
    addSeparator()   // 无参数
```

# 配置

`logsets`支持丰富的配置参数，可以自定义输出样式。

## 默认配置

完整配置如下：


```javascript
import createLogger from "coloredLogger"
const log = createLogger({
    indent: "  ",                                           // 缩进
    singleQuotes: false,                                    // 显示单引号 
    template: "[{level}] {datetime} - {message}",           // 模板
    compact:false,                                          // 是否采用紧凑模式输出
    Array:{
        compact : true,                                     // 是否采用紧凑模式输出
        maxItems: 100,                                      // 数组最大长度，超过则显示省略号
        memo    : (value)=> darkGray("(共"+value.length+"项)")  // 当数组数量超过maxItems时，显示共几项的备注
    },
    Object:{
        compact:true,                                       // 是否采用紧凑模式输出
        maxItems:100,                                       // 成员数量，超过则显示省略号
        align:true,                                         // 是否自动对齐
        memo:(value)=> darkGray("(共"+value.length+"项)"),
    },
    Function : {
        style:"lightCyan",
        format:value=>value.name ? `[Function ${value.name}]` : "()=>{...}"
    },
    AsyncFunction: {
        style:"lightCyan",
        format:value=>value.name ? `[AsyncFunction ${value.name}]` : "async ()=>{...}"
    },
    Error    : {
        style:"red",
        format:e=>`${e.name.firstUpper()}('${e.message}')`
    },
    Null     : "darkGray",
    Undefined: "darkGray",
    Boolean  : "cyan",
    Number   : "yellow",
    String   : "green", 
    Class    : {
        style:"lightCyan",
        format:value=>`[Class ${value.name}]`
    },
    Instance : {
        style:"lightBlue",
        format:value=>`<Class(${value.constructor.name})>`
    },
    Date     : {
        style:"lightBlue",
        format:(value)=>`${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`
    },
    Symbol   : "blue", 
    RegExp   : {
        style:"magenta",
        format:(value)=>`${value.toString()}`
    },
    levels   :{
        align: true,                                        // 是否自动对齐消息
        maxLineChars  : 90,                                 // 每行最大字符数 
        memo     : "darkGray",
        debug    : "lightGray",
        info     : "dim",
        warn     : "yellow",
        error    : "red",
        fatal    : "red"
    } 
})

```

以上是默认的配置，一般情况不需要进行修改覆盖。

## 数据类型显示样式

各种数据类型均可以配置显示样式，支持配置`Array`、`Object`、`Function`、`AsyncFunction`、`Error`、`Date`、`Null`、`Undefuned`、`Boolean`、`Number`、`String`、`Class`、`Instance`，`Symbol`、`Regexp`。

配置数据类型的样式可以按如下方式：

```javascript
// 1. 简单指定类型的样式名称
{
    [数据类型名称]:"<样式名称>,<样式名称>,...,<样式名称>"
}
// 2. 指定类型的样式名称，同时指一个格式化函数来用内容进行格式化
{
    [数据类型名称]:｛
    	style:"<样式名称>,<样式名称>,...,<样式名称>",
        format:(value)=>{...<返回格式化后的内容>...}
    }
}
```

显示**样式名称**支持设置一个或多个，同时使用多个时采用`,`分开。

样式名称用来指定以何种前景颜色、背景颜色或修饰样式，支持如下值：

- **普通前景色：**`red`，`green`，`yellow`，`blue`，`magenta`，`cyan`，`white`，`darkGray`，`black`
    - **加亮前景色：**`lightRed`，`lightGreen`，`lightYellow`，`lightBlue`，`lightMagenta`，lightCyan	，`lightGray`
- **普通背景色：**`bgRed`，`bgGreen`，`bgYellow`，`bgBlue`，`bgMagenta`，`bgCyan`，`bgWhite`，`bgDarkGray`，`bgBlack`
- **加亮背景色：**`bgLightRed`，`bgLightGreen`，`bgLightYellow`，`bgLightBlue`，`bgLightMagenta`，`bgLightCyan`，`bgLightGray`
- **修饰样式：**`bright`，`dim`，`italic`，`underline`，`inverse`



**举例如下：**

```javascript
logger.config({
    Boolean:"bgLightRed,white"
})
```

代表对`Boolean`类型数据采用**亮红色背景**，**白色文本**方式显示。

**注：**样式可能受不平操作系统平台差异，部分样式不支持。

