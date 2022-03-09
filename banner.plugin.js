/**
   
    用来显示一个横幅内容

   ╭──────────────────────────────────────────────────────────────────╮
   |                                 logsets                          │
   │   https://www.xxx.com                                            │
   │                                                                  │ 
   │                                                                  │
   ╰──────────────────────────────────────────────────────────────────╯

   const banner = logger.banner({})

   banner.add("logsets",{align:"center",style:"green"})
   banner.add("https://www.xxx.com")
   banner.add("")
   banner.render()

*/

const  DefaultBannersOptions = {
    width:60,                   // 横幅宽度
    indent:" ",                 // 横幅缩进
    border:{
        style:"lightGray",      // 边框颜色
        width:1                 // 边框宽度,0-不显示，1-单线框,2-双线框
    },

}

