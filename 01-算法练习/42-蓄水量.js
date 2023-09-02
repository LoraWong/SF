
let arr =[1,8,6,2,5,4,8,3,7]
// 需水量 = 最低边界 - 中间山脉高度

// 双指针：左右两边 向中间靠近，每靠近一步，计算此区间的 需水量，与上一次需水量比较 取最大值
// 左指针前进？左指针 小于右指针 或者，左指针当前数字 小于等于 下一位数字

function main(input_str) {
  let heights = input_str.split(" ").map(Number) 
  let result = new Array()
  
  let l = 0
  let r = heights.length - 1
  let max_capacity = 0
  
  while (l < r) {
      let temp_capacity = 0
    
      // 需水量 = 最低边界 - 中间山脉高度
      for (let i = l; i <= r; i++) {
          temp_capacity += Math.max(0, Math.min(heights[l], heights[r]) - heights[i])
      }
  
      if (temp_capacity >= max_capacity) {
          max_capacity = temp_capacity
          result.push([l, r, temp_capacity])
      }
  
      // if ((heights[l] < heights[r]) || (heights[l + 1] >= heights[l])) {
        if ((heights[l + 1] >= heights[l])) {
          l++
      } else {
          r--
      }
  }
  
  result.sort(function(a,b) {
      if (a[2] == b[2]){
          return (a[1]-a[0]) - (b[1]-b[0])
      } else{
          return b[2] - a[2]
      }
  })
  if (result[0][2] === 0) {
      console.log(0)
  } else {
      console.log(`${result[0][0]} ${result[0][1]}:${result[0][2]}`)
  }
  
}

main("1 8 6 2 5 4 8 3 7")