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
