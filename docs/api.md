# API

`logsets`实例`API`如下：

| 名称 | 说明 | 
| :--- | :--- |
| `log(message,...args)` | 对模板字符串进行插值后输出着色后的字符串 |
| `print(...args)` | 根据输入参数的参数类型进行着色输出，比如可以输出JSON ，同`console.log`,差别就在于输出内容的着色|
| `format(value,options)` | 输出带缩进格式和着色过的对象 |
| `debug(...args)` | 输出DEBUG日志，并会对插值变量进行着色。 |
| `info(...args)` |输出INFO日志，并会对插值变量进行着色。  |
| `warn(...args)` | 输出WARN日志，并会对插值变量进行着色。 |
| `error(...args)` | 输出ERROR日志，并会对插值变量进行着色。 |
| `fatal(...args)` | 输出FATAL日志，并会对插值变量进行着色。 |
| `use(plugin)` | 安装插件  |
| `colorize(arg)` | 对输入参数按数据类型进行着色，返回着色后的字符串   |
| `getColorizer(colors)` | 根据颜色字符串返回一个着色函数，如`red,dim`返回能着红色的函数。 |
| `getColorizedTemplate(template, ...args)` |根据模板字符串插值，输出着色后的内容  |
| `separator(width, char= "─")` | 输出一个分割线 |
| `options` | 返回当前配置参数 |
| `colors` | 返回[ansicolor](https://xpl.github.io/ansicolor/)实例 |
| `config(options={})` | 配置 |
