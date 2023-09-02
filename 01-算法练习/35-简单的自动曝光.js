// 求 接近像素中间值 的 可加数

// 先求出 数组平均值 与 128的差值，128=avg  
// 修正 差值：加上差值后，大于255 或小于0的数，与 255 和 0 的差值 除以 其他

let arr = [0,0,0,0]

// tag
 
function main(nums) {
  let offset = 128 - eval(nums.join("+"))*1.0/ nums.length
  offset = fixOffset(nums, offset, getCount(nums, offset))
  if (offset - Math.floor(offset) <= 0.5){
      offset = Math.floor(offset)
  }
  else{
      offset = Math.ceil(offset)
  }
  console.log(Number(offset))
}

function getCount(nums, offset) {
  count = 0;
  for (let num of nums) {
      temp = num + offset
      if (temp < 0 || temp > 255){
          count+=1
      }
  }

  return count
}

function fixOffset(nums, offset, count){
  if (count == 0){
      return offset
  }
  
  offsetOld = offset
  for (let num of nums) {
      temp = num + offsetOld
      if (temp < 0){
          offset += temp / (len(nums) - count)
      }
      else if (temp > 255){
          offset += (temp - 255) / (len(nums) - count)
      }
  }
  return fixOffset(nums, offset, getCount(nums, offset) - count)
}


main([0, 0, 0,0])
