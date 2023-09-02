/**
 * @description: 全排列
 */

let arr = [1, 2, 3]

// 记录使用过的元素
let usedArr = []
let res = []
let path = []

function fn() {
  if (path.length === arr.length) {
    res.push([...path])
    return
  }

  for (let i = 0; i < arr.length; i++) {
    if (!usedArr[i]) {
      path.push(arr[i])
      // 记录使用过的元素
      usedArr[i] = true
      fn()

      // 递归结束，回溯
      usedArr[i] = false
      path.pop()
    }
  }
}

fn()
console.log(res)

/**
 * @description: 子集（组合
 */
let res1 = []
let path1 = []
let usedArr1 = []
function fn1(startIndex) {
  // 子集元素个数不限
  res1.push([...path1])

  for (let i = startIndex; i < arr.length; i++) {
    path1.push(arr[i])
    // 元素不重复
    fn1(i + 1)
    path1.pop()
  }
}

fn1(0)
console.log(res1)
