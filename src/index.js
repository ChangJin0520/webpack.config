// css引用
// require('./index.css')
// require('./index.less')

// 图片引入方式
// import logo from './test.png';

// console.log(123)

// 测试 resolve 下的 alias
// import 'bootstrap';

// 懒加载示例
// let button = document.createElement('button')

// button.innerHTML = 'hello'

// vue的懒加载就是靠这个实现的
// button.addEventListener('click', function() {
//     // es6草案语法 jsonp实现动态加载文件
//     import('./import-test.js').then(data => {
//         console.log(data.default)
//     })
// })

// document.body.appendChild(button)

import jin from './import-test.js'

if (module.hot) {
    // 当接受的模块发生变化时会运行 回调函数
    module.hot.accept('./import-test.js', function() {
        console.log('更新了!')
        console.log(jin)
    });
}
