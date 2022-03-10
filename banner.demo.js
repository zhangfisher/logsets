import createLogger from "./index.js" 
import BannerPlugin from "./banner.plugin.js"

const logger = createLogger()
logger.use(BannerPlugin)

let banner = logger.banner({ 
})

banner.add("Logsets Utility Toolkit")
banner.add("Output color elements at the terminal")
banner.add("Version: ",1)
banner.add("Release: ","2022-01-01")
banner.render()


banner = logger.banner({ 
    width:60
})

banner.add("Logsets工具库")
banner.add("在终端命令行输出彩色文本",{style:"darkGray"})
banner.add()
banner.add("版本: ",1)
banner.add("网站: ","http://www.logsets.com",{align: 'left',style:["","lightBlue"]})
banner.add("发布日期: ","2022-01-01",{align: 'right',style:["","lightMagenta"]})
banner.add("作者: ","fisher",{align: 'right',style:["","lightCyan"]})
banner.add("许可证: ","MIT ","GPL ","Apache 2.0",{style:["","red"]})
banner.render()
