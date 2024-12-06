# 创建实例

`logsets`默认自动创建一个实例，可以直接引入使用。

```javascript
import logsets from "logsets"
logsets.config({...})
```

也可以创建多个实例：

```javascript
import createLogger from "logsets"
const logsets = createLogger({...})
```