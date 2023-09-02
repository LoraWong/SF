

// 枚举 等和子集的个数k：0 - arr.length 个子集，每个子集的和： 数组元素和 / 子集个数
// 求出 满足 目标和子集个数？？
// 判断 数组能否被分为 k 个等和子集

//【待验证】 判断能否分割为等和子集：动态规划(背包问题：第i个数字放入背包容量j的最大价值，数字既是重量也是价值) dp[j] = dp[j-sum[i]] + sun[i]
// 先遍历背包， 再遍历重量（因为元素不能重复，所以倒着遍历
// j = 数组和 除以 子集个数（单个子集和
// 初始化数组 dp[j] = 0

// 求等和子集：回溯法
let arr = [4, 3, 2, 3, 5, 2, 1]
let k = 7
// k 子集个数
function isPartition(k, arr) {
  let sum = arr.reduce((a, b) => a + b)
  // 给数组降序排序（减少递归层级
  arr = arr.sort((a, b) => b - a)
  // 单个子集和
  // 子集和必须为整数
  if (sum % k !== 0) return false
  let target = sum / k
  // 子元素 必须大于 小于或等于 子集和
  if (arr[-1] > k) return false
  // 保存子集和 的数组
  let res = new Array(k).fill(0)
  
  // index：第i个元素
  // target： 单个子集和
  function dfs(target, index) {
    // 元素全部放完，判断每个子集和 是否满足要求
    // 如果能将所有元素都加入到 res 中，说明可以划分为 k 个子集，判断这 k 个子集和是否 等于 target，等于则返回true，否则返回false
    if (index === arr.length) {
      // 判断每个子集和 是否满足要求
      for (let i = 0; i < res.length; i++) {
        if (res[i] !== target) {
          return false
        }
      }
      return true
    }

    for (let i = 0; i < res.length; i++) {
      // 元素放不下，结束这个子集!!!
      if (res[i] + arr[index] > target) continue
      // 元素放得下
      // 加入一个元素
      res[i] += arr[index]
      // 判断当前子集，下一个元素 是否放得下
      if (dfs(target, index + 1)) {
        return true
      }
      // 下一个元素放不下，撤销
      res[i] -= arr[index]
    }
    // 元素没有放完
    return false
  }

  return dfs(target, 0)

  // console.log(res, k, target,arr)
}

isPartition(1, arr)

// main(7, [4, 3, 2, 3, 5, 2, 1])

// 等和子数组最小和
// 从后 大到小枚举 子集个数，计算子集和
let sum = arr.reduce((a,b)=>a+b)
for(let i=k; i>0; i--){
  if(isPartition(i, arr)){
    console.log(sum / i)
    break
  }
}




function isPart(arr, k){
  let sum = arr.reduce((a,b)=>a+b)
  if(sum % k !== 0) return false
  let target = sum /k
  arr = arr.sort((a,b)=>b-a)
  if(arr[-1]>target) return false

  let part = new Array(k).fill(0)

  function dfs(index){
      if(index === arr.length){
        for(let i=0; i<part.length; i++){
          if(part[i] !== target){
            return false
          }
        }
        return true
      }

      for(let i=0; i<part.length; i++){
        if(part[i] + arr[index] > target) continue
        part[i] += arr[index]

        if(dfs(index+1)){
          return true
        }

        part[i] -= arr[index]
      }

      return false

  }

  return dfs(0)
}