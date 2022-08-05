export default {
  title: 'Pure Water CLI',
  description: 'Front End Cli Tool.',
  base: '/pure-water/',
  themeConfig: {
    logo: 'https://raw.githubusercontent.com/yidafu/pure-water/master/docs/imgs/water.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/get-started' },
      { text: 'Github', link: 'https://github.com/yidafu/pure-water' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/get-started' }
        ]
      },
      {
        text: 'Preset',
        items: [
            { text: '介绍', link: '/preset/index' },
            { text: 'Vue2 项目', link: '/preset/preset-vue2' },
            { text: 'Vue3 项目', link: '/preset/preset-vue' },
        ],
      },
      {
        text: '插件',
        items: [
            { text: '介绍', link: '/plugin/index' },
            { text: 'Lint 插件', link: '/plugin/plugin-lint' },
            { text: 'Vue2 插件', link: '/plugin/plugin-vue2' },
            { text: 'Babel 插件', link: '/plugin/plugin-babel' },
            { text: '基础 Webpack 配置插件', link: '/plugin/plugin-webpack-config' },
        ],
      },
      {
        text: '进阶',
        items: [
          { text: 'Plugin API', link: '/advanced/plugin-api' },
          { text: 'pure.config.js', link: '/advanced/pure-config' },
        ]
      }
    ],
  }
}