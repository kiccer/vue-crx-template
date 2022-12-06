const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    outputDir: 'extensions',
    filenameHashing: false,
    productionSourceMap: false,
    pages: {
        // index: 'src/main.js',

        background: {
            // page 的入口
            entry: 'src/background.js',
            // 模板来源
            template: 'public/background.html',
            // 在 dist/index.html 的输出
            filename: 'background.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '背景页'
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },

        options: {
            // page 的入口
            entry: 'src/options.js',
            // 模板来源
            template: 'public/options.html',
            // 在 dist/index.html 的输出
            filename: 'options.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '设置页'
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },

        content: {
            // page 的入口
            entry: 'src/content.js',
            // 模板来源
            template: 'public/content.html',
            // 在 dist/index.html 的输出
            filename: 'content.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '脚本注入'
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },

        popup: {
            // page 的入口
            entry: 'src/popup.js',
            // 模板来源
            template: 'public/popup.html',
            // 在 dist/index.html 的输出
            filename: 'popup.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '弹窗页'
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },

    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
            // .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            // .set('@scss', resolve('src/assets/scss'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@router', resolve('src/router'))
            .set('@store', resolve('src/store'))
            // .set('@plugins', resolve('src/plugins'))
            // .set('@layouts', resolve('src/layouts'))
            // .set('@static', resolve('src/static'))

        // 取消代码分割
        config.optimization.delete('splitChunks')
    }
}
