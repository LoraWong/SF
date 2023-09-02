/**
 * @description: 斐波那契数列
 * 很多题目的数据变化，存在 斐波那契数列 规律，即当前项 = 前两项数据之和 arr[i] = arr[i-2] + arr[i-1]
 * 爬楼梯（一次只能爬1节会2节）
 * 生兔子（从出生后第3个月起每个月都生一只兔子
 */

// dp[i] 第i项元素结尾的数组 的 和
// 一月的时候有一只兔子，假如兔子都不死，问第n个月的兔子总数为多少？
let k = 3
function fn(n) {
  let dp = new Array(n + 1).fill(0)
  // 前2个月兔子数为1
  dp[1] = 1
  dp[2] = 1

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  console.log(dp[k])
}

/**
 * @description: 等差数列
 */

// 从 2 开始的 3 为公差的等差数列）,输出求等差数列前n项和
function fn2(a, d, n){
  let dp = []
   dp[0] = a
  for(let i=1; i<n; i++) {
    dp[i] = dp[i-1] + d
  }

  console.log(dp)
}

fn2(2,3,2)

/**
 * @description: 规律变化的数据
 */

// 求小球落地5次后所经历的路程和第5次反弹的高度
// dp[1][0] = n; dp[1][1] = n/2
// dp[i][0]  第i次落地后经历的路程  dp[i][0] = dp[i-1][0] + dp[i-1][1] *2 
// dp[i][1] 第i次反弹的高度 dp[i][1] = dp[i-1][1] / 2
// 
function fn3(n){

}



/**
 * @description: 字符编辑距离
 */
// dp[i][j] 以第i位字符结尾 的字符串A 和 以第j位字符结尾 的字符串B 的最小编辑距离
// dp[m+1][n+1]
// dp[0][j] = j; dp[i][0] = i
// 分情况：
// A[i] == B[j]:不操作 dp[i][j] = dp[i-1][j-1]
// A[i] !== B[j]: 取最小值
// 增：dp[i][j] = dp[i][j-1] + 1
// 删(长度减1): dp[i][j] = dp[i-1][j] + 1
// 改（长度不变）: dp[i][j] = dp[i-1][j-1] + 1

// 注意！！ 索引m、n 与 i、j的关系：str[i-1]  ;第1位字符结尾的字符串，i=1; str[i-1]
let str = 'abcdefg'
let target = 'abcdef'
let m = str.length
let n = target.length

let arr = new Array(m+1).fill().map(s=>new Array(n+1).fill(0))



function fn4(str, target){
  for(let i=1; i<=m; i++){
    arr[i][0] = i
    for(let j=1; j<=n; j++){
      arr[0][j] = j

      if(str[i-1] === target[j-1]){
        arr[i][j] = arr[i-1][j-1]
      } else {
        arr[i][j] = Math.min.apply(null, [ arr[i-1][j]+1, arr[i][j-1]+1, arr[i-1][j-1] + 1])
      }
    }
  }
}

fn4(str, target)
console.log(arr[m][n])


let arr3 = [2, 5 ,1, 5 ,4, 5 ]
/**
 * @description: 最长递增子序列
 */
// dp[i] 以 第i个元素结尾的数组，的最长递增子序列长度
// dp[0] = 0; dp[i] = 1
// if(arr[i] > arr[j]) dp[i] = Math.max(dp[i], dp[j]+1)
function  fn5(arr) {

  let dp = []
  // 最大数
  let max = 0
  
  for(let i=0; i<arr.length; i++){
    // 初始值：递增子序列中 只有 arr[i] 一个元素
    dp[i] = 1

    // 遍历 arr[i] 之前的元素, 和 arr[i]进行比较
    for(let j=0; j<i; j++){
      if(arr[i] > arr[j]){
        dp[i] = Math.max(dp[i], dp[j]+1)
      }
    }
    // 保存最大数
    max = Math.max(max, dp[i])
  }

  return max
}

console.log(fn5(arr3))



function test(n){
  if(n===1) return 0
  if(n===2) return 1

  let drink = Math.floor( n /3)
  let empty = drink + n % 3

  return drink + test(empty)
}


/**
 * @description: 最长公共子串
 */
// dp[i][j] ：以 前 i个字符结尾的字符串 和前第j个字符结尾的字符串 的最长公共子串
//遍历字符串，当前两个字符相等, 即 strA[i] === strB[j] ， 则  dp[i+1][j+1] = dp[i][j] + 1



// dp[0][j] = 0; dp[i][0] = 0

 
function main(s1, s2) {
  // 生成0矩阵，为方便后续计算，比字符串长度多了一列
  let dp = new Array(strA.length+1).fill(0).map(s=>new Array(strB.length+1))
  let max_length = 0   // 最长匹配的长度
  let p = 0  // 最长匹配对应在s1中的最后一位

  for (let i=0;i<s1.length;i++) {
      for (let j=0;j<s2.length;j++) {
          if (s1[i] == s2[j]) {

              dp[i+1][j+1] = dp[i][j] + 1
              if (dp[i+1][j+1] > max_length) {
                  max_length = dp[i+1][j+1]
                  p = i+1
              }
          }
      }
  } 
  // 返回最长子串
  console.log(s1.substr(p-max_length, p))
}


main("private_void_method","public_void_method")