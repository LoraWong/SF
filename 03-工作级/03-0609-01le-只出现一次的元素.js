// 返回 单一元素的累加和

// 数组去重：map；arr.reduce
// let nums = [1,2,3,4,5];
// const set = new Set(nums)
// Array.from(nums)

let arr = [35, 57, 35, 20, 30]

// 107

let arr1 = new Set(arr)
Array.from(arr1)
// Array.from(arr1) 创建一个新的浅拷贝的数组实例
let arr2 = [...arr1]
console.log(arr1)
// Array.from(arr1) 转换的数组 不能使用 reduce？？？
let res = arr2.reduce((current, prev) => current + prev, 0)

console.log(res)
