// 假好车辆的颜色只有 3 种，找出 N 秒内经过的最多颜色的车辆数量。

// 统计 每种颜色车辆出现的次数， 使用map结构
// 按颜色从大到小，给车辆排序
// 截取前n辆车，计算颜色数量

let arr = [0,1,2,1]
let time = 3

let map = {}
arr.forEach(s=>{
  if(map.hasOwnProperty(s)){
    map[s] += 1
  } else {
    map[s] = 1
  }
})

// 排序！！！！
arr.sort((a,b)=>map[b]-map[a])

let count = {}
arr.slice(0,time).forEach(s=>{
  if(count.hasOwnProperty(s)){
    count[s] += 1
  } else {
    count[s] = 1
  }
})

console.log(Math.max(...Object.values(count)))