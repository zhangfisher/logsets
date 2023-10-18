## 1.3.8 (2023-10-18)


### Bug Fixes

* 修复`typescript`类型错误 ([bbe77bb](https://gitee.com/zhangfisher/logsets/commits/bbe77bb1d1c77fe5b827d090987e338439f17b83))
* 修复type=module时导入flex-tools的问题 ([b392f5e](https://gitee.com/zhangfisher/logsets/commits/b392f5e021b7609d6a03e672af6468ed8d534db9))
* **banner:** 当执行插值变量时计算宽度出错导致渲染失败 ([c8af205](https://gitee.com/zhangfisher/logsets/commits/c8af2057e804223321a7e3814b35c214d5d3b980))
* **banner:** 更新 ([13d625a](https://gitee.com/zhangfisher/logsets/commits/13d625a8abd598802b53d6895ff6584639dc707b))
* **banner:** 修复当插值变量指定颜色时计算字符宽度出错而导致的`invalid array length`错误 ([668a3bd](https://gitee.com/zhangfisher/logsets/commits/668a3bd85cf6991c8eea09c3028b8d48ddab0572))
* **banner:** 修复colorized方法引用错误 ([fde51a1](https://gitee.com/zhangfisher/logsets/commits/fde51a1a0292edebb26dd6bc8bd1a35d0dc7b73e))
* **core:** disable <npm version patch> commit-hooks=false ([3d4678a](https://gitee.com/zhangfisher/logsets/commits/3d4678a8e8ac0b1bb2db645dc35d826868caa7fc))
* **tasklist:** 导入问题修复 ([13ee194](https://gitee.com/zhangfisher/logsets/commits/13ee194b50f5c1ed28726f522ea27692ad61364e))
* **tasklist:** 修复createTasks返回类型 ([1e4e119](https://gitee.com/zhangfisher/logsets/commits/1e4e119ba31ed0c98a74dc7ecf7cc065c16eb297))
* **type:** 修改`DataTypeColorizeOptions`类型为可选 ([3a0b0ef](https://gitee.com/zhangfisher/logsets/commits/3a0b0ef8924a0d218253c78f8ba53b1775b74118))
* update package.json ([f26986b](https://gitee.com/zhangfisher/logsets/commits/f26986ba6357bd43d9765ba8f8f61bea618b19e4))


### Features

* **core:** `format`方法新增加`title`属性用来输出标题 ([872c7ef](https://gitee.com/zhangfisher/logsets/commits/872c7effe4a04f27aeec39b2c97df9747fc13067))
* **list:** 新增加`list`用来显示信息列表 ([455bdac](https://gitee.com/zhangfisher/logsets/commits/455bdac8eed4b4ddab893c088f1008105fd75f69))
* table 支持 .addHeader().addRow()的链式调用 ([ac80a3b](https://gitee.com/zhangfisher/logsets/commits/ac80a3b83d48068b10e00a1af7ad6a81d271e2ae))
* **tasklist:** `tasklist.run`现在能返回任务执行的返回值 ([55e8c76](https://gitee.com/zhangfisher/logsets/commits/55e8c7635dcc03c66c881764473d20ce96ed228a))
* **tasklist:** 调整`logsets.run`的签名方式 ([662f257](https://gitee.com/zhangfisher/logsets/commits/662f257bfae7fcc4496ff5c678d9b49b029d1020))
* **tasklist:** 新增`tasklist.run`方法简化运行任务方式 ([39fb6d5](https://gitee.com/zhangfisher/logsets/commits/39fb6d52eeb1c3a8eaffc00dfb1a66d1ff0b559c))
* **tasklist:** 新增加`logsets.run`方法用来快速执行任务列表 ([83ad0d9](https://gitee.com/zhangfisher/logsets/commits/83ad0d9dabc17a3c4d3966ef704c43e54c927315))
* **tasklist:** 优化createTasks出错时的执行逻辑 ([2ce5fa2](https://gitee.com/zhangfisher/logsets/commits/2ce5fa232a9cdbc0a6b5dca968fddb76640b273d))
* **tasklist:** 增加`createTasks`方法简化`tasklist`使用，减少样板代码 ([f43435b](https://gitee.com/zhangfisher/logsets/commits/f43435b48439e65fd5ab8c878f4c5ed134c1b14d))
* **tasklist:** createTasks的execute函数现在传入一个task对象，可以用来在任务执行期间修改任务提示信息 ([04153af](https://gitee.com/zhangfisher/logsets/commits/04153af61f2fd6ce3a87645f56f659ce760c1b6a))
* **tasklist:** tasklist.run能定制返回任务的执行结果 ([2beaae1](https://gitee.com/zhangfisher/logsets/commits/2beaae105488938c8f20aa85fe76d56c820fcfef))


### Performance Improvements

* **tasklist:** `tasklist.run`方法返回值类型支持更宽泛，如`return 'skip'`和`return "SKIP"`均可以生效 ([2c296ae](https://gitee.com/zhangfisher/logsets/commits/2c296aebff87afb12c9249503f77ac5ef9c0651f))



