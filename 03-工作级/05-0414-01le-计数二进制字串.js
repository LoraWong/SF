// 给定一个字符串，统计并返回 具有相同数量 0 1 的非空子字符串的数量，所有0和所有1都是成组连续的

let s = '00110011'

// 回文子串---回溯法

let res = []
let path = []
function fn(startIndex) {
  if (startIndex > s.length) {
    res.push(path)
    return
  }

  // lastIndex
  for (let i = startIndex; i < s.length; i++) {
    let str = s.substring(startIndex, i + 1)
    if (isCheck(str)) {
      path.push(str)
      fn(i + 1)
      path.pop()
    }
  }
}

// 判断回文串
function isCheck(str) {
  if (str.length % 2 !== 0) {
    return false
  }
  let subLen = str.length / 2
  let left = str.substring(0, subLen)
  let right = str.substring(subLen, str.length)
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
