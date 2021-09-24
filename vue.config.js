module.exports = {
    outputDir: 'extensions',
    pages: {
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
    }
}
