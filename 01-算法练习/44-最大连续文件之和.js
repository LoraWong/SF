/**
 * @description: 最大递增子序列 之和
 */

// dp[i] 以 第 i个元素结尾的数组，的最大递增子序列之和

let dp = []
let max = 0
let arr = [100, 300, 500, 400, 400, 150, 100]

for (let i = 0; i < arr.length; i++) {
  // 初始化！！ ,只有 i一个元素时
  dp[i] = arr[i]
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) {
      dp[i] = Math.max(dp[i], dp[i] + arr[j])
    }

    // dp[i] = Math.max(dp[i], dp[i] + arr[j])
  }
  max = Math.max(max, dp[i])
}

console.log(max)

/**
 * @description: 连续子序列之和，滑动窗口
 */
// 和小于 M，扩大窗口范围，右边+1，保存最大值
// 和大于 M，缩小窗口范围，左边+1

let res = 0
let l = 0
let r = 0

let M = 1000
// 从 0开始，向右滑动窗口

for (let i = 0; i < arr.length; i++) {
  let sum = arr[i]
  for (let j = i + 1; j < arr.length; j++) {
    sum += arr[j]
    if (sum > M) {
      sum -= arr[j]
      break
    }
  }
  res = Math.max(res, sum)
}
console.log(res)
