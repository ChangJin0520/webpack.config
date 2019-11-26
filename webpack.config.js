const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: 'production', // 模式 development
    entry: './src/index.js', // 入口
    output: {
        // filename: 'bundle.[hash:8].js', // 打包后文件名
        filename: 'bundle.js', // 打包后文件名
        path: path.resolve(__dirname, 'dist') // 路径
    },
    devServer: { // 开发服务器配置
        port: 8080, // 服务端口号
        progress: true, // 进度条
        open: true, // 自动打开浏览器
        contentBase: './dist' // 服务运行的地址
    },
    optimization: { // 优化项
        minimizer: [
            new TerserJSPlugin({}), // 压缩js
            new OptimizeCSSAssetsPlugin({}) // 压缩css
        ]
    },
    module: { // 模块
        rules: [ // 规则
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader', // style-loader 把css插入到htm中
                    // options: { // 配置
                    //     insertAt: 'top' // css样式插入位置
                    // }
                }, {
                    loader: 'css-loader' // css-loader 用来处理@import路径
                }]
            }, {
                test: /\.less$/, // stylus sass 处理类似
                use: [
                    MiniCssExtractPlugin.loader, // 抽离css
                    {
                        loader: 'css-loader' // 解析路径
                    }, {
                        loader: 'postcss-loader' // 结合prefixer自动添加前缀
                    }, {
                        loader: 'less-loader' // 把less -> css
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ // 抽离css
            filename: 'css/main.css',
        }),
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
