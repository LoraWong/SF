

// 使用递推(记住就行)
// 本次加分 = 上次加分 + 本次日志数 （大于100 则去100
// 本次减分 = 上次减分 + 上次加分

let arr = [3,7,40,10,60]

let add = [arr[0]]
let remove = [0]
let score = [arr[0]]

for(let i=1; i<arr.length; i++){
  let temp = add[i-1] + arr[i]
  if(temp <100){
    add[i] = temp
  } else {
    add[i] = 100
  }

  remove[i] = add[i-1] + remove[i-1]

  score[i] = add[i] - remove[i]
}

console.log(score)