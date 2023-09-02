// 左边界升序排序
//遍历区间，以当前区间为起点
// 找到后面区间 满足第二个左 小于 第一个右 的，以该线段为起点，继续向下找

let arr = [
  [1, 4],
  [2, 5],
  [3, 6],
]
// 左边界升序排序
arr.sort((a,b)=>a[0]-b[0])


let rang = [arr[0]]

// 以当前区间为起始区间，向右边查找重叠区间
for(let i=1; i<arr.length; i++){
  // 后一个
  let [start2, end2] = arr[i]

  while(true){
    // 前一个
    let [start1,end1] = range[range.length-1]
  }

}











total_len = arr[arr.length-1][1] - arr[0][0]
// 当前满足条件的最小区间数 arr[arr.length-1][1] - arr[0][0]
let min = arr.length

// 遍历区间，以当前区间为起点， 寻找后面符合条件的区间数
for(let i=0; i<arr.length; i++){

  // find(arr[i][0], i, 0)
}

console.log(total_len, min)

// 回溯法
// start 区间起始值 arr[i][0]
// index 起始区间索引号 i
// count 当前满足条件的区间数 0

function find(start, index, count) {
  // 完全覆盖
  if(arr[index][1] - start >= total_len){
    // 比较最小值
    min = Math.min(min,count)
    return
  }

  let temp = 0 // 满足要求的前一个线段索引（初始值从0开始
  // 遍历 起始区间之后的区间
  for(let i=index+1; i<arr.length; i++){
    // 找出下一个满足要求的线段
    // 1.当前线段 右 大于 起始线段 左
    if(arr[i][0] <= arr[index][1]){
      // 2.满足要求的两个线段 要重叠： 当前线段右 大于 前一个线段左（ 后右 大于 前右
      if(arr[i][1] > arr[temp][1]) {
        // 保存下一个起始线段 索引
        temp = i
      }
    } else {
      break
    }

    // 找到满足要求的线段
    if(!temp){
      // 继续以该条线段为起点，继续找
      find(arr[temp][0], temp, count+1)
    }
  }
}

// bug
