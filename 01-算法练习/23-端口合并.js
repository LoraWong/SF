// 判断两个数组 中 是否存在两个以上元素重复
function find(arr1, arr2) {
  if(!arr1.length  || !arr2.length) return false
  // 排序
  arr1 = arr1.sort((a, b) => a - b)
  arr2 = arr2.sort((a, b) => a - b)

  // 查找相等元素
  let count = 0
  for (let i = 0; i < arr1.length ; i++) {
    for (let j = 0; j < arr2.length ; j++) {
      if (arr1[i] === arr2[j]) {
        count++
        if (count >= 2) {
          return true
        }
      }
    }
  }
  // console.log(count,arr1)
  return false
}

// 合并端口
// 控制 函数执行 //tag
let flag = true
function fn(arr){
  flag = false
  for(let i = 0; i < arr.length; i++) {
    for(let j = i+1; j < arr[i].length-1; j++){
      if(find(arr[i], arr[j])){
        // 合并
        console.log(arr[j], arr[i])
        arr[j] =  Array.from(new Set([...arr[i], ...arr[j]])).sort((a,b)=>a-b)
        arr[i] = []
        flag = true
        break
      }
    }
  }
  if(flag){
    fn(arr)
  }
  
}

let arr = [[2,3,1],[4,3,2],[5]]

fn(arr)
console.log(arr)

// console.log(find([1, 2, 3], [1, 5, 6]))
