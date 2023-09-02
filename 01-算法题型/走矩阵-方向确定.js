let m = 8

/**
 * @description: 循环不变量
 * 场景：矩阵走向确定在一个方向!!，撞墙才会改变方向
 * 与迷宫问题的区别：迷宫走向不确定!!，必须满足条件才能走！！解法：回溯
 */

/**
 * @description: 蛇形矩阵
 * 确定起始点： startrow ++ ;startcol=0
 * 确定循环次数：m行, 循环m次
 */
let arr = []
let count = 1
let startrow = 0
let startcol = 0
for (let i = 0; i < m; i++) {
  if (!arr[i]) arr[i] = []
  let row = startrow, col = startcol

  // 向右上
  for (; row >= 0 && col < m; row--, col++) {
    arr[row][col] = count++
  }

  // 撞墙, 更新起始位置
  startrow++
  startcol = 0
}

console.log(arr)

/**
 * @description: 螺旋矩阵
 */
function fn(m) {
  let arr = new Array(m).fill(0).map(() => new Array(m).fill(0));
  let count = 1
  let startrow = 0
  let startcol = 0
  let loop = Math.floor(m/2)
  let offset = 1;    // 控制每一层填充元素个数

  // 注意！！左闭右开, 拐角处让给新的一条边来继续画。

  for (let i = 0; i < loop; i++) {
    let row = startrow
    let col = startcol;
    // 上行从左到右（左闭右开）
    for (; col < m-startcol-1; col++) {
      arr[row][col] = count++
    }
    // 右列从上到下（左闭右开）
    for (; row < m-startrow-1; row++) {
      arr[row][col] = count++
    }

    // 向左 下行从右到左（左闭右开）
    for (; col > startcol; col--) {
      arr[row][col] = count++
    }

    // 向上 左列做下到上（左闭右开）
    for (; row > startrow; row--) {
      arr[row][col] = count++
    }

    // 撞墙, 更新起始位置
    startrow++
    startcol++
    // 更新offset
    offset += 2;
  }

  console.log(arr)
}

fn(4)


/**
 * @description: 杨辉三角形
 */

// 行数
let n = 4


function fn3(n) {
  // 列数
  m = 2*n - 1

  let dp = new Array(n).fill(0).map(()=>new Array(m).fill(0))
  

  let startrow = 2
  let startcol = n/2 + 1

  dp[0][startcol] = 1
  dp[1][startcol] = 1
  dp[1][startcol-1] = 1
  dp[1][startcol+1] = 1
  for(let i=2; i<n; i++) {
   let count = i
   let row=startrow
   let col = startcol

    // 向右
    for(; col<=startcol+i ; col++){
      dp[row][col] = count++
    }

    count = i
    col = startcol
    // 向左
    for(; col>=startcol-i; col--){
      dp[row][col] = count++
    }

    startrow++
  } 
  dp.forEach(s=>{
     console.log(s)
  })
 
}
fn3(4)