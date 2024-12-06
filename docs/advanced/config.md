# 全局配置

绝大多数情况下，`logsets`是开箱即用的，不需要进行配置。

但是`logsets`也支持丰富的配置参数，可以自定义输出样式。

## 默认配置

完整配置如下：

```javascript
import createLogger from "logsets"
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
    [数据类型名称]:{
    	style:"<样式名称>,<样式名称>,...,<样式名称>",
        format:(value)=>{...<返回格式化后的内容>...}
    }
}
```


## 颜色样式

显示**样式名称**支持设置一个或多个，同时使用多个时采用`,`分开。

样式名称用来指定以何种前景颜色、背景颜色或修饰样式，支持如下值：

- **普通前景色：**`red`，`green`，`yellow`，`blue`，`magenta`，`cyan`，`white`，`darkGray`，`black`
- **加亮前景色：**`lightRed`，`lightGreen`，`lightYellow`，`lightBlue`，`lightMagenta`，lightCyan	，`lightGray`
- **普通背景色：**`bgRed`，`bgGreen`，`bgYellow`，`bgBlue`，`bgMagenta`，`bgCyan`，`bgWhite`，`bgDarkGray`，`bgBlack`
- **加亮背景色：**`bgLightRed`，`bgLightGreen`，`bgLightYellow`，`bgLightBlue`，`bgLightMagenta`，`bgLightCyan`，`bgLightGray`
- **修饰样式：**`bright`，`dim`，`italic`，`underline`，`inverse`

所有可以定制显示颜色样式的参数均支持`TypeScript`提示

**举例如下：**

```javascript
logsets.config({
    Boolean:"bgLightRed,white"
})
```

代表对`Boolean`类型数据采用**亮红色背景**，**白色文本**方式显示。

**注**: 样式可能受不平操作系统平台差异，部分样式不支持。

## 文本样式

在上述所有功能中均会使用一个`style`参数来配置自定义的显示样式。

`style`参数是一个使用`,`分割的字符串，可以同时应用`1-N`个字符串色彩和样式。比如`style="bgLightRed,white"`代表采用**亮红色背景**，**白色文本**方式显示。
