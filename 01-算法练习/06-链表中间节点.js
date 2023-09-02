

// 遍历所有节点，将节点 按顺序排成数组，找出数组 中间值（偶数取右边那个节点

let next = '00010'
let arr = ['00000 3 -1', '00010 5 12309', '11451 6 00000', '12309 7 11451']

 arr = arr.map(s=> s.split(' '))

// 把节点数组 转化为 map结构
// 把指针作为 key
let map = {}
arr.forEach(s=>{
  map[s[0]] = [s[1], s[2]]
})

console.log(arr,map[next][0])
let res = []

// 一直循环到节点不存在 为止
while(map[next]){
  // 保存值
  res.push(map[next][0])
  // 修改指针
  next = map[next][1]
}

console.log(res)

let len = res.length
let index
if(len % 2 === 0) {
  // 向下取整
  index = Math.floor(len / 2)
} else {
  index = len /2
  
}
console.log(res[index])