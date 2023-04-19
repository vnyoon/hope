export default {
  base: process.env.NODE_ENV === 'production' ? '/hoped/' : '/',
  themeConfig: {
    siteTitle: "Welcome to hoped-ui~",
    nav: [
      {
        text: "指南",
        link: "/guild/installation"
      },
      {
        text: "组件",
        link: "/components/button/"
      }
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/one-season/hope"
      }
    ],
    sidebar: {
      "/guild/": [
        {
          text: "基础",
          items: [
            {
              text: "安装",
              link: "/guild/installation"
            },
            {
              text: "快速开始",
              link: "/guild/quickstart"
            }
          ]
        },
        {
          text: "进阶",
          items: [
            {
              text: "xxx",
              link: "/xxx"
            },
            {
              text: "xxx2",
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