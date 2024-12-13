# 输出彩色内容

`logsets`依赖于`ansicolor`，并且将其挂在了`logsets.colors`下，因此也可以直接调用来生成彩色内容。

```javascript
import logsets from "logsets"  

console.log(logsets.colors.red(text))
console.log(logsets.colors.green(text))
console.log(logsets.colors.yellow(text))
console.log(logsets.colors.blue(text))
console.log(logsets.colors.magenta(text))
console.log(logsets.colors.cyan(text))
console.log(logsets.colors.white(text))
console.log(logsets.colors.darkGray(text))
console.log(logsets.colors.black())
```

支持的方法如下：

```javascript
export interface ColorizedMethods{    
    default (text:string):string
    white (text:string):string
    black (text:string):string
    red (text:string):string
    green (text:string):string
    yellow (text:string):string
    blue (text:string):string
    magenta (text:string):string
    cyan (text:string):string

    darkGray (text:string):string
    lightGray (text:string):string
    lightRed (text:string):string
    lightGreen (text:string):string
    lightYellow (text:string):string
    lightBlue (text:string):string
    lightMagenta (text:string):string
    lightCyan (text:string):string

    bright (text:string):string
    dim (text:string):string
    italic (text:string):string
    underline (text:string):string
    inverse (text:string):string

    bgDefault (text:string):string
    bgWhite (text:string):string
    bgBlack (text:string):string
    bgRed (text:string):string
    bgGreen (text:string):string
    bgYellow (text:string):string
    bgBlue (text:string):string
    bgMagenta (text:string):string
    bgCyan (text:string):string

    bgDarkGray (text:string):string
    bgLightGray (text:string):string
    bgLightRed (text:string):string
    bgLightGreen (text:string):string
    bgLightYellow (text:string):string
    bgLightBlue (text:string):string
    bgLightMagenta (text:string):string
    bgLightCyan (text:string):string
}
```
`
