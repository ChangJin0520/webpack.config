const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: 'development', // 模式 development production
    entry: {
        index: './src/index.js',
        expose: './src/expose-loader-use.js'
    }, // 入口
    output: {
        filename: '[name].js', // 打包后文件名
        // filename: 'bundle.[hash:8].js', // 带hash的文件名
        path: path.resolve(__dirname, 'dist') // 路径
        // publicPath: 'http://www.xxx.com/' // cdn路径
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
    // 源码映射
    // source-map：大而全；
    // eval-source-map：不会产生.map单独文件；
    // cheap-module-source-map：不会显示列，但会产生一个单独文件；
    // cheap-module-eval-source-map：不会产生文件，也不产生列
    devtool: 'cheap-module-eval-source-map',
    watch: true, // 监控
    watchOptions: { // 监控配置
        poll: 1000, // 监控频率
        // aggreateTimeout: 500, // 监控防抖
        ignored: /node_modules/ // 忽略不需要监控的代码
    },
    resolve: { // 解析 第三方包
        modules: [path.resolve('node_modules')], // 解析包地址
        // mainFields: ['style', 'main'], // 配置第三方包解析入口
        // mainFiles: [] // 配置入口文件的名字  默认为 index.js
        // extensions: ['.js', '.css', '.json'], // 扩展名配置 当不写后缀名时会按此顺序查找 vue中有类似配置
        alias: { // 别名
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
        }
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
                // }, { // js代码校验
                //     test: /\.js$/,
                //     use: {
                //         loader: 'eslint-loader',
                //         options:{
                //             enforce: 'pre' // previous 提前执行 post 之后执行
                //         }
                //     }
            }, { // 使用babel处理js
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader 把es6 -> es5
                        presets: [
                            '@babel/preset-env' // es6 -> es5
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties', // 转化es7中的class语法
                            '@babel/plugin-transform-runtime', // babel转换运行时
                            '@babel/plugin-syntax-dynamic-import' // 是支持import语法
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'), // 包含
                exclude: /node_modules/ // 排除
            }, { // 处理图片
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 40 * 1024, // 限制图片大小小于200K的使用base64来转化 否则使用file-loader产生真实图片
                        outputPath: 'img/' // 图片路径
                    }
                }
            }, { // 处理html中的图片图片
                test: /\.html$/,
                use: {
                    loader: 'html-withimg-loader'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ // 抽离css
            filename: 'css/main.css', // css路径
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', // 生成文件名
            chunks: ['index', 'expose'], // 控制引入哪个个打包文件
            minify: {
                removeAttributeQuotes: true, // 删除双引号
                collapseWhitespace: true // 折叠为一行
            },
            hash: true // 添加hash戳
        }),
        new webpack.DefinePlugin({ // 配置定义环境变量
            DEV: JSON.stringify('development'),
            PRODUCTION: JSON.stringify('production')
        })
    ]
}
