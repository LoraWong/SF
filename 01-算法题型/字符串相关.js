
/**
 * @description: 正则
 */
// 找出给定字符串中大写字符(即'A'-'Z')的个数。

str.replace(/([A-Z])/g, ($, $1)=>{
  res++
})
// 大写或小写字母可以直接 比较
if($1 >= 'a' && $1 <= 'c'){
  return '2'
}

// 是否包含 小写字母
/[a-z]/.test(str)
// 是否包含数字
/\d/.test(str)
// 数字、字母、下划线以外的其他符号
/\W/.test(str)
// 是否为数字
isNaN(str)


// 数字保留小数位数
num.toFixed(2)

/**
 * @description: 数字 转为 字符
 */
num.toString(2) // 转为二进制字符
// 二进制字符 转 十进制数字
// parseInt(string, radix) 解析一个字符串并返回指定基数的十进制整数
parseInt(str, 2)


/**
 * @description: 字符串按字典排序: 
 */
arr.sort()


/**
 * @description:  ASCII 与 字符串 转换
 */
str.charcodeAt() // ASCII
String.fromCharCode(str) // 字符串


/**
 * @description: 增删改查
 */
// 查找某个字符
str.indexOf(target)
str.includes(target)
// 从后向前查找，返回符合要求的最后一次出现的起始索引
str.lastIndexOf(target)

// 截取某个字符
str.substring(startIndex, endIndex) // 不包含endIndex
str.slice(startIndex, endIndex) // 不包含endIndex
// slice(-5)  倒数第5位开始截取

// 指定位置n插入某个字符
str.slice(startIndex, n) + str[n] + str.slice(n)

// 删除/替换某个字符
str.replace(target, '')

// 翻转某个字符
str.split('').reverse()

// 将字符串 作为表达式执行
eval(str)

// 字符 前补位 到8位
str.padStart(8, '0')


/**
 * @description: 日期
 */
// 获取一个日期
new Date(year, month, day) // 月份要减1 ！！！！
// Thu Apr 04 2019 00:00:00 GMT+0800 (中国标准时间)

// 日期转换成天数
// 日期相减得到时间戳
let res = (date - start)/1000/60/60/24 + 1

var day = Xmas95.getDate(); // 返回某一日 1-31
const day1 = birthday.getDay(); // 周几， 0 表示星期天。
date.getFullYear() // 年份
// getMonth  返回一个 0 到 11 的整数值：0 代表一月份


/**
 * @description: 参数解析
 */
let str1 = 'xcopy /s "C:\\program files" "d:\"'

// 1.参数分隔符为空格
// 2.对于用""包含起来的参数，如果中间有空格，不能解析为多个参数。

// 如何保证 不分割 引号中的 字符？ 将引号中的空格替换为某个字符
// 使用flag标记：读取到引号，flag去反，之后再读取到空格，进行替换；

function fn(){

  let flag = 0
  for(let i=0; i<str.length; i++){
    if(str[i] === '"'){
      flag = !flag
    }
    if(flag && str[i] === ' '){
      str = str.slice(0, i) + '0' + str.slice(i+1)
    }
  }
}

/**
 * @description: 字符串通配符
 */
let str = 'te?t*.*'
let target = 'txt12.xls'
function fn6(str, target){
  // 将 str 转换为正则，
  // 使用 正则，替换targe，为空，则说明 str和target相匹配

  str = str.replace(/\*/g, '[a-zA-z0-9]{0,}').replace(/\?/g, '[a-zA-Z0-9]{1}')

  let reg = new RegExp(str)

  target = target.replace(reg, '')

  if(target){
    console.log(true)
  } else {
    console.log(false)
  }

}

fn6(str, target)
