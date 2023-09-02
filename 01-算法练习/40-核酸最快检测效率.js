// dp[i][j] : 给第i个采样员 剩余 j个志愿者时 的最快检测效率
// 优先给 效率最快的采样员 分配志愿者
// 分配 1名 ：
// 分配 2 名：
// 分配 3 名
// 分配 4名

// 初始化
// 按检测人员效率排序？？
let effect = [200,200].sort((a,b)=>b-a)

// 检测人数量
let m = 2
// 样品数量
let n =2

let dp = new Array(m+1).fill(0).map(s=>new Array(n+1).fill(0))

// dp[i][0] = 经检测人员效率 * 80%

let temp = 0
for(let i=1; i<=m; i++){
  temp += effect[i-1] * 0.8
  dp[i][0] = temp
}



for(let i=1; i<=m; i++){
  for(let j=1; j<=n; j++){
    // 不分配（前一个的效率 加 自己的效率
    let no_v = dp[i-1][j] + effect[i-1] *0.8
    // 分配1
    let v_1 = dp[i-1][j-1] +  effect[i-1]
    // 分配2
    let v_2 = dp[i-1][j-2] + effect[i-1] * 1.1
    // 分配3
    let v_3 =  dp[i-1][j-3] + effect[i-1] * 1.2
    // 分配4
    let v_4 =  dp[i-1][j-4] + effect[i-1] * 1.3
    if(j===1){
      dp[i][j] = Math.max(no_v, v_1)
    } else if(j>=2){
      dp[i][j] = Math.max(no_v, v_1, v_2)
    } else if(j >=3){
      dp[i][j] = Math.max(no_v, v_1, v_2, v_3)
    } else if( j>=4){ {
      dp[i][j] = Math.max(no_v, v_1, v_2, v_3, v_4)
    }
  }
}

}

console.log(dp[2][2])
