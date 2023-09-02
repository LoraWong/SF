

// let arr = [[2,3,1], [6,9,2], [0,5,1]]
let arr = [[3,9,2], [4,7,3]]

// 把时间点去重(set) 形成数组并排序；（一定要去重
// 遍历每个时间点，查找在哪个区间，加上该区间所需的并发数(利用区间会重叠的原理)

let set = []

for(let i=0; i<arr.length; i++){
  set.push(arr[i][0])
  set.push(arr[i][1])
}

set = Array.from(new Set(set)).sort()
let max = 0
for(let i=0; i<set.length; i++){
  let num = 0
  // 查找在哪个区间，加上该区间所需的并发数

  for(let j=0; j<arr.length; j++){
    let start = arr[j][0]
    let end = arr[j][1]
    let lines = arr[j][2]
    if(set[i]>=start && set[i] <= end){
      num += lines
    }
  }

  // 取最大值
  max = Math.max(max, num)
}

console.log(set, max)