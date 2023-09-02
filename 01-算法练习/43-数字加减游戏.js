// let arr = [5, 2]
let [a,b]= [4, 10]

let target = 33
let res = 0



// 加 a 和 减a只有一个能存在

fn(11,11)
console.log(res)
// 递归的计算结果初始值
function fn(subVal, addVal) {
  // 是 b的倍数
  if ((target-subVal)%b===0) {
    return
  }

  if ((target-addVal)%b===0) {
    return
  }

  res++
  fn(subVal-a,addVal+a)
  
}

function main(nums){
  let s = nums[0]
  let t = nums[1]
  let a = nums[2]
  let b = nums[3]

  let res = 0
  let add = s
  let sub = s
  while (true){
      if((t - add)%b == 0)
          break
      
      if((t - sub)%b == 0)
          break
      
      add += a
      sub -= a
      res+=1
  }

  console.log(res)
}

main([11, 33, 4, 10])
