# 按数据类型输出

提供`print`方法，用来连续输出多个经过着色的参数。
```javascript
    print(arg1,arg2,arg3,.....)
    print(arg1,arg2,arg3,.....,{end:"\n",append:" "}) // 增加可选的输出参数
```


## 配置参数

同`log`方法.

## 示例

```javascript
import logsets from "logsets" 

logsets.print("String",true,100,()=>{},[1,2,3])
logsets.print(null,undefined)
logsets.print(/^colored$/g)
logsets.print(new Error("Value Error"))
logsets.print(new Date())  
logsets.print(class A{})
logsets.print(new (class X{})())
logsets.print({name:"tom",age:100,admin:true,posts:["a","b"],values:[1,2,3]},()=>"hello")
```

输出效果如下：

![image](./images/log2.jpg)
