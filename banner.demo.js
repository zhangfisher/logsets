import createLogger from "./index.js" 
import BannerPlugin from "./banner.plugin.js"

const logger = createLogger()
logger.use(BannerPlugin)

let banner = logger.banner({ 
})

banner.add("Logsets Utility Toolkit")
banner.add("Output color elements at the terminal")
banner.add("Version:{} ",1)
banner.add("Release:{#red}   ","2022-01-01")
banner.render()


banner = logger.banner({ 
    width:60
})

banner.add("Logsets工具库")
banner.add("在终端命令行输出彩色文本")
banner.add()
banner.add("版本: {}",1)
banner.add("网站: {}","http://www.logsets.com",{align: 'left'})
banner.add("发布日期:{}","2022-01-01",{align: 'right'})
banner.add("作者:{author}",{author:"fisher"},{align: 'right'})
banner.add("许可证: {#lightYellow} {} {}",["MIT","GPL","Apache 2.0"])
banner.render()
