// 从小到大排序，每次拿出一米补最短的木板，补完排序，继续补，直到木板用完

// 优化，使用 [[木板长度，木板个数]] 的数组存储相同木板，

// let arr = [4, 5, 3, 5, 5]
let arr = [4,5,3,5,5]
// let len = 3
len = 2

function fn(arr, len) {
  while (len > 0) {
    arr = arr.sort((a, b) => a - b)
    // let min = arr[0]
    arr[0] += 1
    len -= 1
  }

  return arr.sort((a, b) => a - b)[0]
}

console.log(fn(arr, len))


