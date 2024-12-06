import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Logsets",
  description: "Nodejs terminal application output colorized enhancement",
  base: '/logsets/',
  themeConfig: {
    outline: {
      label: "目录",
      level: [2, 5]
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '开源推荐', link: 'https://zhangfisher.github.io/repos/' }
    ],

    sidebar: [
      {
        text: '关于',
        collapsed:false,
        items: [
            { text: '介绍', link: '/intro/about'},
            { text: '安装', link: '/intro/install'}
        ]
      },
      {
        text: '指南',
        collapsed:false,
        items: [
          { text: "创建", link: "/guide/create" },
          { text: "数据类型", link: "/guide/datatype" },
          { text: "模板字符", link: "/guide/template" },
          { text: "格式化对象", link: "/guide/format" },
          { text: "横幅", link: "/guide/banner" },
          { text: "列表", link: "/guide/list" },
          { text: "日志", link: "/guide/log" },
          { text: "进度条", link: "/guide/progressbar" },
          { text: "分割条", link: "/guide/separator" },
          { text: "表格", link: "/guide/table" },
          { text: "任务", link: "/guide/task" },
          {   text: "任务列表", 
              link: "/guide/tasklist",
              items:[
                { text: "执行任务列表", link: "/guide/run-tasklist" },
                { text: "快速任务列表", link: "/guide/quick-tasklist" },
              ]

          },
          { text: "树", link: "/guide/tree" }
        ]
      },
      {
        text: '高级',
        collapsed:false,
        items: [ 
          { text: "输出彩色内容", link: "/advanced/colorized" },
          { text: "全局配置", link: "/advanced/config" },
          { text: "开发插件", link: "/advanced/plugin" },
        ]
      },
      {
        text: 'API',
        link: '/api', 
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangfisher/logsets' }
    ]
  }
})
