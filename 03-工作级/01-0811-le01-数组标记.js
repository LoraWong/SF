// 给定一个数组 和 增加值
// 若 当前元素 + 增加值， 成为数组中的最大元素，则把当前元素标记为 1，否则标记为0
let arr = [1, 2, 3, 4, 5]

let addNum = 3

// [0 ,1,1,1,1]

// 复制 原数组，用于标记
// ！！！遍历数组，+ 增加值 后 判断该元素是否为最大值，则标记对应位置的元素 为 1

let res = [...arr]

for (let i = 0; i < arr.length; i++) {
  let sum = arr[i] + addNum
  arr[i] += addNum
  if (Math.max.apply(null, arr) === sum) {
    res[i] = 1
  } else {
    res[i] = 0
  }
  arr[i] -= addNum
}

console.log(res)
