// 给定一个字符串，统计并返回 具有相同数量 0 1 的非空子字符串的数量，所有0和所有1都是成组连续的

let s = '00110011'

// 回文子串---回溯法

let res = []
let path = []

fn(0)
console.log(res)

function fn(startIndex) {
  //如果起始位置大于s的大小，说明找到了一组分割方案
  if (startIndex >= s.length) {
    res.push([...path])
    return
  }

  // lastIndex
  for (let i = startIndex; i < s.length; i++) {
    let str = s.slice(startIndex, i + 1)
    // if (isCheckOne(str) || isCheckTwo(str)) {
    //   path.push(str)
    //   fn(i + 1)
    //   path.pop()
    // } else {
    //   fn(i + 1)
    // }
    path.push(str)
    // 寻找i+1为起始位置的子串
    fn(startIndex + 1)
    path.pop()
  }
}

// console.log(isCheck('000111'))

// 判断回文串

// 01
function isCheckOne(str) {
  if (str.length % 2 !== 0) {
    return false
  }

  let left = 0
  let right = str.length - 1

  while (left < right) {
    if (str[left] === '0' && str[right] === '1') {
      left++
      right--
    } else {
      return false
    }
  }
  return true
}

function isCheckTwo(str) {
  if (str.length % 2 !== 0) {
    return false
  }

  let left = 0
  let right = str.length - 1

  while (left < right) {
    if (str[left] === '1' && str[right] === '0') {
      left++
      right--
    } else {
      return false
    }
  }
  return true
}

// function isCheck(str) {
//   let left = 0
//   let right = str.length - 1
//   while (left < right) {
//     if (str[left] !== str[right]) {
//       return false
//     }
//     left++
//     right--
//   }
//   return true
// }
