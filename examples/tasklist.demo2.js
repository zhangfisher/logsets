const logsets = require("../src")
const summary = logsets.tasklist({grouped:true})
summary.addGroup("配置信息：")   
summary.addMemo("语言配置文件: {}"),"settingsRelFile"
summary.addMemo("拟支持的语言: {}",['zh-CN','en-US'])   
summary.addMemo("已安装运行时: {}"),'@voerkai18n/runtime'
summary.addMemo("工作模式    :  {}"),"库模式"
summary.addGroup("初始化成功,下一步：")
summary.addMemo("修改{}文件编辑语言参数"),`languages/settings.json`
summary.addMemo("运行<{}>扫描提取要翻译的文本"),"voerkai18n extract"
summary.addMemo("运行<{}>在线自动翻译"),"voerkai18n translate"
summary.addMemo("运行<{}>编译语言包"),"voerkai18n compile"
summary.done()