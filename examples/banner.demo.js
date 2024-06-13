const logsets = require("../src")  

 
let banner = logsets.banner({ 
})

banner.add("Logsets Utility Toolkit")
// banner.add("Output color elements at the terminal")
// banner.add("Version:{} ",1)
banner.add("Help:{} ","https://zhangfisher.github.io/flexci/")
// banner.add("Release:{#red}   ","2022-01-01")
banner.render()


banner = logsets.banner({ 
    width:60
})

banner.add("Logsets工具库")
    .add("在终端命令行输出彩色文本")
    .add()
    .add("版本: {}",2)
    .add("网站: {}","http://www.logsets.com",{align: 'left'})
    .add("发布日期:{}","2022-01-01",{align: 'right'})
    .add("作者:{author}",{author:"fisher"},{align: 'right'})
    .add("许可证: {#lightYellow} {} {}",["MIT","GPL","Apache 2.0"])
    .add("Run <{#yellow}> to upgrade","npm upgrade -g @voerkai18n/cli") 

    .render()



    const banner1 = logsets.banner()
    banner1.add("VoerkaI18n")
    banner1.add("VoerkaI18n command line interactive tools",{style:"darkGray"})
    banner1.add() 
    banner1.add("installed: {} latest: {}",[1,2])
    banner1.add("Run <{#yellow}> to upgrade","npm upgrade -g @voerkai18n/cli")
    banner1.render() 

    