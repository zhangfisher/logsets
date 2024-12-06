# 开发插件

`logsets`支持开发扩展插件，步骤如下：


## 第一步：定义插件函数
`logsets`插件是一个普通的函数，其传入参数：

- **logsets**: 当前`logsets`实例，一般可以直接在其上面挂载插件函数
- **options**： 当前`logsets`实例的配置参数,==`logsets.options`

```javascript

export default function(logsets,options){
    logsets.myplugin = (opts={})=>{
        // ....插件逻辑
    }
}

```
## 第二步：编写插件逻辑

`logsets`插件主要使用当前`logsets`实例的`colorize`,`getColorizer`,`getColorizedTemplate`这三个函数来控制终端输出的颜色。

- `colorize`
  对输入参数按数据类型进行着色，返回着色后的字符串。例:`colorize(1)`,`colorize(true)`,`colorize("logsets")`返回的是根据配置中的数据类型的样式着色后的字符串。
- `getColorizer`
    根据颜色字符串返回一个着色函数，如`red,dim`返回能着红色的函数。
    比如要输出`红色，高亮`的内容，可以`logsets.getColorizer("red,bright")("hello logsets")`
- `getColorizedTemplate`
    根据模板字符串插值，输出着色后的内容。例：`getColorizedTemplate("{}+{}={}",1,1,2)`返回的就是经过着色后的字符串。可以直接使用`console.log(getColorizedTemplate("{}+{}={}",1,1,2))`

`logsets`插件也可以直接调用当前插件实例方法(如`print`,`format`,`log)`来显示内容。
需要注意，`colorize`,`getColorizer`,`getColorizedTemplate`这三个函数并不会在控制台输出，仅仅是返回着色后的字符串。

`logsets`也提供了一些工具函数来简化常见的功能。

```javascript
import {
    // 显示/隐藏光标
    hideCursor,              
    showCursor,             
    // 字符串居中/左/右填充，主要是将中文按2个字符处理
    paddingCenter,
    paddingStart,
    paddingEnd,
    // 获取字符串长度，中文按2个字符表示，多行字符串取其中最长的一行
    // 如果是着色过的会自动去掉着色再计算
    getStringWidth,
    // 截取字符串，超过显示省略号，支持中文
    cutstr,
    //截断字符串为多行字符串\
    // truncateString("123456789",3,"*") == "123*456*789"
    // truncateString("123456789",3) == 第一行："123 第二行：456 第三行：*789
    truncateString
    // 输出新行，等效\n
    newline
} from 'logsets/utils' 

```

## 第三步：注册插件

```javascript
import logsets from 'logsets'
import MyPlugin from 'my-plugin'
logsets.use(MyPlugin)
```
