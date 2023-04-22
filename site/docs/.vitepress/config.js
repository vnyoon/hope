export default {
  base: process.env.NODE_ENV === 'production' ? '/hoped/' : '/',
  themeConfig: {
    siteTitle: "Welcome To Hope~",
    nav: [
      {
        text: "文档",
        link: "/guild/introduction"
      }
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/one-season/hope"
      }
    ],
    sidebar: {
      "/": [
        {
          text: "开始",
          items: [
            {
              text: "简介",
              link: "/guild/introduction"
            },
            {
              text: "快速上手",
              link: "/guild/quick-start"
            }
          ]
        },
        {
          text: "基础",
          items: [
            {
              text: "目录结构",
              link: "/xxx"
            },
            {
              text: "组件开发",
              link: "/xxx2"
            },
            {
              text: "全局组件",
              link: "/xxx"
            },
            {
              text: "打包发布",
              link: "/xxx2"
            }
          ]
        }
      ],
      "/components/": [
        {
          text: "基础组件",
          items: [
            {
              text: "Button",
              link: "/components/button"
            }
          ]
        }
      ]
    }
  }
}