/**
 * @description: 迷宫走向不确定!!，必须满足条件才能走！！解法：回溯
 */

// row 第几行
// clo 第几列

let res = []
function dfs(row, col){
  // 标记走过，保存轨迹
  arr[row][clo] = 1
  res.push([row, col])

  // 走到终点
  if(row === m-1 && col === n-1){
    console.log(res)
  }


  // 向上
  // 向下
  // 向左
  // 向右
  if(row-1>=0 && arr[row-1][clo] === 0){
    dfs(row-1, col)
  }
  if(row+1<m && arr[row+1][clo] === 0){
    dfs(row+1, col)
  }
  if(clo-1>=0 && arr[row][clo-1] === 0){
    dfs(row, col-1)
  }
  if(col+1<n && arr[row][clo+1] === 0){
    dfs(row, col+1)
  }

  // 走不通，回溯
  arr[row][col] = 0
  res.pop()

}