let m = 7
let n = 3

let res = []
let path = []

/**
 * @description: 组合
 * startIndex：循环起始位置
 * sum：累加和
 */
// 如果是一个集合来求组合的话，就需要startIndex，。
// 如果是多个集合取组合，各个集合之间相互不影响，那么就不用startIndex，例如：17.电话号码的字母组合

// 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// 组合问题（元素不可重复：i+1

function fn(sum, startIndex) {
  // 终止条件
  if (path.length === n) {
    if (sum === m) {
      // 判断已经存在该组合
      res.push([...path])
    }
    return
  }

  for (let i = startIndex; i <= m; i++) {
    sum += i
    path.push(i)
    // i+1 元素不重复
    fn(sum, i + 1)
    sum -= i
    path.pop()
  }
}

fn(0, 0)
console.log(res)

// 元素可重复（i
// 注意该方法，不能出现元素0，否则会死循环 ??

let res1 = []
let path1 = []
function fn1(sum, startIndex) {
  if (path1.length === n) {
    if (sum === m) {
      res1.push([...path1])
    }
    return
  }

  for (let i = startIndex; i <= m; i++) {
    sum += i
    path1.push(i)
    // 如何重复选取呢? 关键点:不用i+1了，表示可以重复读取当前的数
    fn1(sum, i)
    sum -= i
    path1.pop()
  }
}

fn1(0, 0)
console.log(res1)

/**
 * @description: 24点游戏（结果不对！！！！
 */

let arr = [5, 8, 8, 13]

// sum: 当前计算总值
// arr: 要计算的数组
function cal(arr, total) {
  // 减枝
  if (total < 1) return false
  // 结束条件：数组中只剩一个数
  if (arr.length === 1) {
    if (arr[0] === total) {
      return true
    } else {
      return false
    }
  }
  // 如果arr不是只剩一个数，就调用函数本身（直到只剩一个为止返回真假）
  for (let i = 0; i < arr.length; i++) {
    // 即将计算的元素，从数组删除
    let newArr = arr.slice(0, i).concat(arr.slice(i + 1))
    let curr = arr[i]
    // 递归： 将 第i个元素 与 前一次结果 进行计算
    if (cal(newArr, total + curr)) {
      return true
    }
    if (cal(newArr, total - curr)) {
      return true
    }
    if (cal(newArr, total * curr)) {
      return true
    }
    if (cal(newArr, total / curr)) {
      return true
    }
  }

  return false
}

console.log(cal(arr, 24))

/**
 * @description: 子集
 */
let arr3 = [1, 2, 3]
let res3 = []
let path3 = []
let usedArr3 = []
function fn3(startIndex) {
  // 子集元素个数不限
  res3.push([...path3])

  for (let i = startIndex; i < arr3.length; i++) {
    path3.push(arr3[i])
    // 元素不重复
    fn3(i + 1)
    path3.pop()
  }
}

fn3(0)
console.log(res3)

function fn4() {
  let arr3 = [1, 2, 3]
  let res3 = []
  let path3 = []
  // let usedArr3 = []
  function fn3(startIndex) {
    // 子集元素个数不限
    res3.push([...path3])

    // let usedArr3 = []
    for (let i = startIndex; i < arr3.length; i++) {
      if (!usedArr3[i]) {
        path3.push(arr3[i])
        // 标记元素已经使用过
        // usedArr3[i] = true
        // 元素不重复
        fn3(i + 1)
        path3.pop()
        // usedArr3[i] = false
      }
    }
  }

  fn3(0)
  console.log(res3)
}
fn4()
