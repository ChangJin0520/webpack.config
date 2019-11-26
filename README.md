# 一份webpack配置
## 插件及相关介绍

## loader及相关介绍

## 全局引入变量的三种引入方式引入方式
1. expose-loader 暴露到window
   import $ from 'expose-loader?$!jquery'  
   使用`expose-loader` 暴露 全局的loader  
   是一个 内联的loader  
   loader有四种: pre 前面执行的loader  normal 普通loader 内联loader 后置postloader  

   也可以配置到webpack.config中
    ```
    {
        test: require.resolve('jquery'),
        use: 'expose-loader?$'
    }
    ```
2. webpack.providePlugin 在每个模块中注入$对象  
    ```
    new webpack.ProvidePlugin({
        $: 'jquery'
    })
    ```
3. cdn路径引入然后借助externals不打包  
   当使用cdn路径之后再添加import的话会导致包被打包进bundle中  
   这个时候可以配置externals来忽略包
   ``` json
   externals: {
       jquery: '$'
   }
   ```

## webpack打包图片
1. 在js中创建图片引入 file-loader
   ``` js
   import logo from './logo.png' // 先导入
   let image = new Image();
   image.src= './logo.png'; // 就是一个普通的字符串
   documeng.body.appendCHild(image);
   ```
   file-loader 默认会在内部生成一张图片到build目录下 返回一个新的图片地址
2. css中background('url')
   css的loader中会自动解析这个地址解析为require
3. \<img src="./logo.jpg" alt="" />  
   html-withimg-loader 可以吧图片地址解析为需要的地址

* 可以使用url-loader把图片转化为base64
    ```
    {
        test: /\.(png|jpg|gif)$/,
        use: {
            loader: 'url-loader',
            // 大于64的会自动调用file-loader
            options: {
                limit: 64 * 1024
            }
        }
    },
    ```
