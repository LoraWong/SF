// 回文串 正着读 和 反着读 都一样

// 给定一个 字符串，所有字符重新排列，若为回文字符串，并返回字典许最小的回文串

// 生成回文串

let str = 'dbebdeb'

fn(str)

function fn(str) {
  let map = {}

  // 记录每个字符，使用map：key-字符；val--每个字符组成的数组
  for (let i = 0; i < str.length; i++) {
    if (map.hasOwnProperty(str[i])) {
      map[str[i]].push(str[i])
    } else {
      map[str[i]] = [str[i]]
    }
  }

  // 判断是否能组成回文串
  // ！！！！数量为奇数 的字符 多于 1个，则不能组成回文串
  let odd = {}
  let even = {}
  for (const key in map) {
    if (map[key].length % 2 !== 0) {
      odd[key] = map[key]
    } else {
      even[key] = map[key]
    }
  }
  if (Object.keys(odd).length > 1) {
    return str
  }

  // 左半边--升序
  // 右半边--降序
  // 中间：中间只有一个字符
  let mid = ''
  if (Object.keys(odd).length === 1) {
    mid = Object.values(odd)[0].splice(0, 1)
  }

  if (Object.values(odd)[0].length > 0) {
    even = Object.assign(even, odd)
  }
  let left = []
  for (const key in even) {
    left.push(...even[key].splice(0, even[key].length / 2))
  }

  left.sort()
  console.log(left)
  // 转数组中的元素，并返回同一数组的引用, ！!!注意，会改变原数组
  let right = [...left].reverse()
  console.log(left, mid, right)

  // 拼接字符串

  let res = left.join('') + mid[0] + right.join('')
  console.log(res)
}
