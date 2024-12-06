# # 执行任务列表

## 基本用法

当需要执行多个任务时使用`tasklist`来进行任务指示，需要写很多的样板代码，如：

```javascript
const logsets = require("logsets")

const tasks = logsets.tasklist()

try{
    tasks.add("任务1")
    await task1()
    tasks.complete()
}catch(e){
    tasks.error(e)
}
//....

try{
    tasks.add("任务n")
    await taskn()
    tasks.complete()
}catch(e){
    tasks.error(e)
}

```

我们提供了一个`createTasks`方法，可以简化上述代码，如下：

```javascript
const tasks = logsets.createTasks([
        {
            title:"任务处理被停止",
            execute:async ()=>{
                await delay(100)
                return "abort"
            }
        },
        {
            title:"开始扫描文件",
            execute:async ()=>{await delay(100);return 1}            
        },
        {   title:"准备对文件进行预处理",
            execute:async ()=>{throw new Error("已安装")}, 
        },
        {   title:"准备对文件进行预处理",
            execute:async ()=>{
                await delay(100)
                return "已完成"
            }
        },
        {   title:"执行过程中显示进度",
            execute:async ({task})=>{
                for(let i=0;i<100;i++){
                    await delay(100)
                    task.note(i+"%")
                }
            }
        },
        {
            title:"读取文件并编译成exe文件",
            execute:async ()=>{
                await delay(100)
                return ['stop',"不干了"]
            }            
        },        
        {
            title:"任务处理被停止",
            execute:async ()=>{
                await delay(100)
                return ["abort",'真的不干了']
            }
        },
        "-",
        {
            title:"任务执行失败",
            execute:async ()=>{throw new Error("TimeOut")},
            error:["ignore","忽略:{message}"]
        },
        {
            title:"任务待办状态",
            execute:async ()=>{throw new Error("TimeOut")},
            error:"出错了"
        },    
        "出错处理",
        {
            title:["下载文件：{},大小:{}, 已下载{}","package.json",122,344],
            execute:async ()=>{throw new Error("TimeOut")},
            error:"出错了:{message}"
        },
        {
            title:["下载文件：{},大小:{}, 已下载{}",["package.json",122,344]],
            execute:async ()=>{throw new Error("TimeOut")},
            error:()=>"X"
        },
        {
            title:["下载文件：{},大小:{}, 已下载{}",["package.json",122,344]],
            execute:async ()=>{throw new Error("TimeOut")},
            error:()=>"skip"
        },      
    ],{ignoreErrors:true})


    try{
        let results = await tasks.run(["开始执行{}任务",5])
        console.log(results)            
    }catch(e){
        console.error(e)
    }

```


运行后的效果如下：

![](./images/createTasks.png)


## 声明任务列表

`createTasks`方法接受两个参数，第一个参数是任务列表，第二个参数是配置参数。

```javascript
createTasks(
    tasks:CreateTaskDefine[],
    options?:CreateTasksOptions
):TaskRunner
```

`CreateTaskDefine`是一个对象,用来声明任务，包含以下属性：

每一个任务均指定一个`execute`函数，根据该函数的返回值来决定任务状态提示信息。

```javascript
    {
        // 任务标题，可以是字符串或者数组，数组中的字符串可以包含插值变量
        title:"任务标题", 
         // 任务标题可以是字符串数组，对插值变量进行自动着色
        title:["任务标题{},{},{}",1,2,3],
        execute:async (context)=>{
            // context是run方法传入的上下文对象，可以在任务执行函数中使用，可以在此保存任务执行的中间结果  
            // 返回值可以是字符串、函数
            // 字符串： 显示完成提示信息
            return "<内置任务状态>"  //'ignore' | 'running' | 'complete' | 'error' | 'abort' | 'fail' | 'cancel' | 'skip' | 'stop' | 'todo'
            return ["<内置任务状态>","提示信息"]  // 第二个参数是提示信息 
            return "abort"           // 代表该任务被跳过，等效于task.abort()并中断后续任务
            return "skip"           // 代表该任务被跳过，等效于task.skip()
            return ["skip","跳过操作"]// 代表该任务被跳过，等效于task.skip("跳过操作")
            return "ignore"         // 代表该任务ignore，等效于task.ignore()
            return "其他任意字符串"  // 代表该任务完成，等效于task.complete("其他任意字符串" )
        }, 
        // 当任务执行失败时的状态，可以是字符串、函数
        error:"<内置的任务状态>",//'ignore' | 'running' | 'complete' | 'error' | 'abort' | 'fail' | 'cancel' |  'skip' | 'stop' | 'todo'  
        error:["<内置的任务状态>","提示信息"], // 第二个参数是提示信息
        error:"skip"                   // 代表该任务被跳过，等效于task.skip()
        error:["skip","跳过"]          // 代表该任务被跳过，等效于task.skip("跳过")
        error:"abort"                  // 代表该任务被终止，等效于task.abort()
        error:"ignore"                 // 代表该任务ignore，等效于task.ignore()
        error:"任务失败提示",           // 代表该任务失败，等效于task.error("任务失败提示" )
        error:"任务出错:{message}",     // 代表该任务失败，等效于task.error(`任务失败提示${error.message}` )
        error:"任务出错:{code}",        // 代表该任务失败，等效于task.error(`任务失败提示${error.code}` )
        error:"任务出错:{stack}",       // 代表该任务失败，等效于task.error(`任务失败提示${error.stack}` )
        error:({error})=>{
            
        }
    }

```


- `execute`参数用来指定一个异步任务执行函数，注意必须是异步函数.
- `execute`可以返回以下值：
    - `void | undefined`：代表任务执行成功，等效于`task.complete()`
    - `内置的任务状态`： 取值是`'ignore' | 'running' | 'complete' | 'error' | 'fail' | 'cancel' | 'skip' | 'stop' | 'todo'`，代表任务执行的状态，等效于`task[status]()`
    - `["内置的任务状态","提示信息"]`： 数组类型，第一个参数是`'ignore' | 'running' | 'complete' | 'error' | 'fail' | 'cancel' | 'skip' | 'stop' | 'todo'`，代表任务执行的状态，等效于`task[status](提示信息)`
    - `string`: 任意字符串，代表任务执行成功，等效于`task.complete(任意字符串)`

- 默认情况下，当执行任务函数`execute`出错时，`error`用来配置当`execute`函数执行出错后的的行为:
    - `error='ignore' | 'running' | 'complete' | 'error' | 'fail' | 'cancel' | 'skip' | 'stop' | 'todo' `显示对应的状态文本。
    - `error='abort'`：终止后续任务的执行。   
    - `error=['abort','提示信息']`：终止后续任务的执行。   
    - `error="内置的任务状态"`: 等效于`task[status]()`
    - `error=["内置的任务状态","提示信息"]`: 等效于`task[status](提示信息)`
    - `error=(error)=>{}`：函数返回值可以是以上任意值。
    - 如果没有指定`error`参数，则默认是执行等效于`task.error(error.message)`，继续执行后续任务。如果指定了`abortOnError=true`则停止后续任务的执行。
    - 当指定`error`是一个字符串时，可以指定`{message}`,`{code}`,`{stack}`这三个插值变量，如`error="出错了:{message}"`


- 在满足以下条件时停止后续任务的执行:
    - 在`execute`显式返回`abort`或`["abort",""]`
    - 当`execute`函数出错时，显式指定`error=abort`或`error=["abort",""]`或`error=(error)=>{返回'abort'或["abort",""]}`
    - 指定`abortOnError=true`时，则无论`error`指定任何值均会停止后续任务的执行
    - 如果`abortOnError=false`时，则也可以通过指定`execute`或`error`返回`abort`或`["abort",""]`来停止任务
    - 如果`ignoreErrors=true`，则以上规则失效，所有任务均会得到执行，该选项用于调试。

- 当任务出错时，如果选择了继续执行后续任务，则`tasks.run`不会触发错误，而可以通过`tasks.run`的返回值来获取错误信息。比如执行了10个任务有6个出错，但是均选择了`skip`,则此时`tasks.run().errors==[Error,Error,....]`

## 任务上下文

执行任务列表时可以传入一个上下对象参数，该参数将会传递给每个任务的`execute`函数，同时会在上下文中注入一个`task`对象，可以在任务执行过程中调用`task.note`来修改任务的执行信息。

```typescript

const tasks = logsets.createTasks([
    {
        title:"正在下载文件",
       execute: async function (context) {
            const {a,task}  = context   // task是自动注入的任务对象
			await delay();
            for(let i=0;i<10;i++){
                await delay(100)
                task.note(`${i}%`)  // 修改任务的执行信息
            }
		},
    }
])

await tasks.run("开始执行",{a:1})  // 可选地传入一个上下文对象
```



## 配置参数

```javascript
createTasks(tasks:CreateTaskDefine[],options?:CreateTasksOptions):TaskRunner

interface CreateTasksOptions{
    abortOnError?:boolean
    ignoreErrors?:boolean            
}
```

- `ignoreErrors`忽略所有错误，所有任务均会得到执行，该选项用于调试。
- `abortOnError`当任务出错时，是否停止后续任务的执行，默认为`true`。如果`=false`,也可以通过指定`execute`或`error`返回`abort`或`["abort",""]`来停止后续任务的执行。

 