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
//.......更加的着色方法请参考ansicolor文档
```

`logsets.colors===ansicolor`实例，可参考其文档。