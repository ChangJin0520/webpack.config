const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development', // 模式
    entry: './src/index.js', // 入口
    output: {
        filename: 'bundle.[hash:8].js', // 打包后文件名
        path: path.resolve(__dirname, 'dist') // 路径
    },
    devServer: { // 开发服务器配置
        port: 8080, // 服务端口号
        progress: true, // 进度条
        open: true, // 自动打开浏览器
        contentBase: './dist' // 服务运行的地址
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', // 生成文件名
            minify: {
                removeAttributeQuotes: true, // 删除双引号
                collapseWhitespace: true // 折叠为一行
            },
            hash: true // 添加hash戳
        })
    ]
}
