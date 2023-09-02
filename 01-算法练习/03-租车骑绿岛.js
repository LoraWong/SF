let num = 4
let weight = 3
let arr = [3,2,2,1]

function fn(weight, arr){
  // 数组排序，最左边和最右边 相加
  // arr[right] + arr[left] > weight, 说明只能一个人 arr[right] 骑；r--
  //  arr[right] + arr[left] <= weight， 说明可以两个人骑， r--, l++

  arr.sort()
  let l = 0
  let r = arr.length
  let res = 0
  while(l<r){
    if(arr[l] + arr[r]< weight){
      r--
    } else {
      r--
      l++
    }
    res += 1
  }

  // 如果最后中间还有一个人，也要加1 ！！！！！
  if(l === r){
    res += 1
  }

  console.log(arr, res)
}

fn(weight, arr)


