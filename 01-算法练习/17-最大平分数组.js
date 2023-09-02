

// 等和子集

// let arr = [4,3,2,3,5,2,1]
let arr = [5,2,1,5,2,1,5,2,1]

// 求最大的平分数组个数
for(let i = arr.length; i >0; i--){
  if(fn(arr,i)){
    console.log(i)
    break
  }
}


// 子集个数
// 判断子集是否能被平分
function fn(arr, k){
  // console.log(arr)
  let sum = arr.reduce((a,b)=>a+b)
  arr = arr.sort((a,b)=>b-a)
  if(sum%k !==0) return false
  let target = sum / k
  if(arr[-1] >target) return false

  let res = new Array(k).fill(0)


  function dfs(index){
    if(index === arr.length){
      for(let i=0; i<res.length; i++){
        if(res[i] !== target) return false
      }
      return true
    }


   for(let i=0; i<res.length; i++){
    if(res[i] + arr[index] > target) continue

    res[i] += arr[index]

    if(dfs(index+1)){
      return true
    }
    res[i] -= arr[index]
   }

   return false
  }

  return dfs(0)
}