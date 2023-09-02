// 给出两个时间字符串 source target，
// 每次 操作 可以 增加1，5，15，60分钟
// 最少经过几次调整，保证 source 等于 target

// ！！！换算成分钟，计算差值
// 解法1--贪心，循环减去 可以减去的最大值
// 解法2--回溯

let reNum = [1, 5, 15, 60]
let source = '18:46'
let target = '21:10'
let res = 0

let num1 = target.split(':')[0] * 60 + parseInt(target.split(':')[1])
let num2 = source.split(':')[0] * 60 + parseInt(source.split(':')[1])

let sum = num1 - num2
console.log(sum)
let index = reNum.length - 1
while (sum > 0) {
  while (sum - reNum[index] < 0) {
    index--
  }
  sum -= reNum[index]
  console.log(reNum[index])
  res++
}

console.log(res)
