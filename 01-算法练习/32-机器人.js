
// 求最大面积

let arr = [[1,2,5,2],[2,4,4,5],[3,5,7,1],[4,6,2,4]]

let m = 4
let n = 4

// 默认可走一格
let res = 1
// 标记走过
let visited = path = new Array(m).fill(0).map(s=>new Array(n).fill(0))
let count = 0
// 偏移量
let direct = [[-1,0],[1,0],[0,-1],[0,1]]

// 遍历 所有起点
for(let i = 0; i <m; i++) {
  for(let j = 0; j <m; j++) {
    if(visited[i][j] === 0){
      count = 0
      df(i,j)
      res = Math.max(res, count)
    }
  }
}

console.log(res)

function df(x,y){
  // 终止条件：访问过的节点
  if(visited[x][y] ===1 ) return
  // 标记走过
  visited[x][y] = 1
  count++
  // 是否可以继续往 上下左右走
  for(let i = 0; i<direct.length; i++){
    let new_x = x + direct[i][0]
    let new_y = y + direct[i][1]

    if(new_x>=0 && new_x<m && new_y>=0 && new_y<m && Math.abs(arr[x][y] - arr[new_x][new_y]) <=1){
      df(new_x, new_y)
    }
  }
}



