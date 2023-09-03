// 给定两个数组，arr2的每个元素 都出现在arr1中，
// 对arr1的元素排序，使arr1中相对顺序 和 2中的相对顺序相同，未在2中出现元素按升序放在 arr2末尾

let arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19]
let arr2 = [2, 1, 4, 3, 9, 6]

// 保存 arr2每个元素的索引号
// 给 arr1 的每个元素标记索引号，按索引号给数组重新排序
// 重新排列 arr1的元素

// 保存 arr2每个元素的索引号
let map2 = {}

for (let i = 0; i < arr2.length; i++) {
  map2[arr2[i]] = i
}
// 给 arr1 的每个元素标记索引号，按索引号给数组重新排序
for (let i = 0; i < arr1.length; i++) {
  // [元素， 在arr2中的索引值]
  let index = map2[arr1[i]]
  arr1[i] = [arr1[i], index]
}

// 重新排列 arr1的元素
let left = arr1.filter((item) => item[1] !== undefined).sort((a, b) => a[1] - b[1])

let right = arr1.filter((item) => item[1] === undefined).sort((a, b) => a[0] - b[0])

let res = left.concat(right).map((item) => item[0])

console.log(res)
