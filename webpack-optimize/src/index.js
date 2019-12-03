import $ from 'jquery'
import moment from 'moment'

// 手动引入所需要的包
import 'moment/locale/zh-cn'

// 设置语言
moment.locale('zh-cn')

let r = moment().endOf('day').fromNow();
console.log(r)
