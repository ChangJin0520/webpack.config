const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 8080,
        open: true,
        contentBase: './dist'
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
