// 指针
// 如果当前数 和 下一个数 相同
// 都是奇数，删除两个数，插入该数的两倍
// 都是偶数，直接插入该数的两倍

// arr.splice(从何处添加/删除元素, 删除多少元素(默认删除所有), 要添加到数组的新元素)
// 在数组开头插入
// var shuiguo = ["Banana", "Orange", "Apple", "Mango"];
// shuiguo.splice(0, 0, "Lemon");
//输出结果
//Lemon, Banana, Orange, Apple, Mango

let arr = [1, 2, 2, 6, 3, 3, 6]
// [1,2,4,2,6,12,6,12,6]
let i = 0
while (i < arr.length - 1) {
  if (arr[i] === arr[i + 1]) {
    if (arr[i] % 2 === 0) {
      console.log(arr[i])
      arr.splice(i + 1, 0, arr[i] * 2)
      i += 2
    } else {
      arr.splice(i, 2, arr[i] * 2)
      if (i > 0) {
        i -= 1
      }
    }
  } else {
    i++
  }
}
console.log(arr)
