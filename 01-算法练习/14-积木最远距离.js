// let arr = [1,2,3,1,4]
let arr = [2,1]

// 请小薇找到这排积木中数字相同且所处位置最远的2块积木块，计算他们的距离，

// 使用 lastIndexOf !== index，说明有重复元素

let max = 0

arr.forEach((item, index)=>{
  lastIndex = arr.lastIndexOf(item)
  if(lastIndex !== index){
    max = Math.max(max, lastIndex-index)
  }
})

if(max){
  console.log(max)
} else {
  console.log(-1)
}
