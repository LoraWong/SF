// 数组 奇数升序排序 偶数降序排序，奇数 和 偶数位置不变

let arr = [3, 1, 2, 4, 6, 5, 7, 8, 9]
// [1,3,8,6,4,5,7,2,9]

// 取出所有奇数，并做标记；排序；把排序后的元素 填入 标记位置
// 偶数同理

let odd = []
let even = []
arr.forEach((item, index) => {
  if (item % 2 === 0) {
    even.push(item)
    arr[index] = 'even'
  } else {
    odd.push(item)
    arr[index] = 'odd'
  }
})

// 排序
odd.sort((a, b) => a - b)
even.sort((a, b) => b - a)

// 填入 标记的位置
arr.forEach((item, index) => {
  if (item === 'odd') {
    arr[index] = odd.shift()
  }
  if (item === 'even') {
    arr[index] = even.shift()
  }
})

console.log(arr)
