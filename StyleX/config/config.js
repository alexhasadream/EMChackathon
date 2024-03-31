import { defineConfig } from '@umijs/max'
import day from 'dayjs'
import antd from './antd_provider'
import proxy from './proxy'
import routes from './routes'

export default defineConfig({
    antd,
    dva: {},
    locale: { default: 'zh-CN', antd: true },
    define: {
        APP_TITLE: 'BRICK'
    },
    hash: true,
    npmClient: 'pnpm',
    proxy,
    routes,
    headScripts: [],
    metas: [{ name: '--------------- 版本日期 ---------------', content: `${day().format('YYYY-MM-DD HH:mm:ss')}` }],
    extraBabelPlugins: process.env.NODE_ENV === 'production' ? ['babel-plugin-dynamic-import-node'] : []
    // publicPath: '/webportal/'
})
