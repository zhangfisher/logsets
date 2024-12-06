# 进度条

显示一个滚动的进度条。

## 基本用法

```javascript
import logsets from "logsets" 

const pbar = logsets.progressbar({
    title     : "下载进度",
    //...其他配置参数...
})

progressbar.begin()   	// 开始启动进度条
for(let i = 0 ; i <= 60; i++){
    await delay()
    progressbar.value(i) // 更新进度条
}
progressbar.end()  		 // 结束进度条

```

`progressbar.demo.js`输出效果如下：

![](./images/progressbar.png)

## 配置参数

`progressbar`支持以下配置参数：

```javascript
{
    title:"<显示标题>"
    theme     : "",       // 可选主题色，内置支持default,red,green
    max       : 100,      // 进度最大值
    min       : 0,        // 进度最小值
    value     : 0,        // 当前值   
    // 显示在最后的备注字符串,支持插值变量{value} {percent} {max} {min}
    dispaly   : "{percent}%",
    width     : 60,       // 进度条宽度 
    background: {         // 进度条样式
        show  : true,     // 是否显示背景，默认显示，不显示时只显示进度条滑块
        style : "bgDarkGray",       // 进度条样式
        char  : " "
    },       
    slider    : {                // 滑块字符
        style : "bgWhite",       // 进度条样式
        char  : " ",             // 
    } 
}
```

- 所有参数均是可选的，大部份情况下只需要配置`max`、`min`参数即可。
- `dispaly`参数用来控制当进度条正在执行时显示在右侧的信息，支持插值变量`{value}` `{percent}`、` {max} `、`{min}`，比如`{percent}%`显示百分比，`{value}/{max}`显示当前进度值与最大值。
- `width`用来指定进度条的宽度，默认是`60`个字符。
- `background`用来控制进度条的背景，默认是暗灰色空格。
- `slider`用来控制进度值，默认是白色空格。

## API

### begin()

  开始一个进度条，开始时会隐藏光标

### value(n)

  更新进度

### end(note)

  结束进度条，结束后换行

### stop(note)

  停止进度条，`note`参数会显示在进度条右侧。

### error(note)

  进度条出错，`note`参数会显示在进度条右侧。