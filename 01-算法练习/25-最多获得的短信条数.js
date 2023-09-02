
// 预算： total
// 最大短信条数：为第 dp[i][j] , 充值 i种套餐 ，预算为 j 时，的最大短信条数
// 短信条数： value[i] 充值i元获得短信条数
// 价格：price[i]

let total = 6
let [m, n] = [5,6]

let num = [0,10,20,30,40,60]
let price = [0,1,2,3,4,5]

let dp = new Array(m+1).fill(0).map(s=>new Array(n+1).fill(0))


// 遍历套餐
for(let i=1; i<=m; i++) {
  // 遍历预算
  for(let j=1; j<=n; j++) {
    // tag
    if(price[i] <= j){
      dp[i][j] = Math.max(dp[i-1][j-price[i]] + num[i], dp[i-1][j])
      // dp[j] = dp[j-i] + num[i]
    } else {
      dp[i][j] = dp[i-1][j]
    }
  }
}

console.log(dp[m][n])