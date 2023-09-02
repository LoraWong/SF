// 
// 组合问题
// 贪心 + 排序 + 双指针

// let cpuCore = 32
// let serviceA = [16, 8, 16]
// let serviceB = [2, 7]

let cpuCore = 64
let serviceA = [32, 8, 16]
let serviceB = [32, 16, 54, 16, 16]

// 每个组合最多只能有两个元素，且元素和不超过cpuCore，每个组合serviceA中的元素个数不能超过1
// 输出所有元素组合完毕后，组合个数最小
// 贪心：一个组合只能有一个serviceA元素，serviceA元素和serviceB优先组合，再组合剩下的serviceB元素
// 为了使剩下的serviceB元素尽可能两两组合，应该使剩下的serviceB元素尽可能小
// A升序，B降序

serviceA.sort((a, b) => a - b)
serviceB.sort((a, b) => b - a)

console.log(serviceA, serviceB)

let bIndex = 0
let res = []
// 遍历a
for (let i = 0; i < serviceA.length; i++) {
  if (bIndex >= serviceB.length) {
    res.push([serviceA[i]])
    continue
  }
  // 寻找 符合当前a 的 元素b
  while (bIndex < serviceB.length) {
    if (serviceA[i] + serviceB[bIndex] <= cpuCore) {
      res.push([serviceA[i], serviceB[bIndex]])
      // 标记用过的元素
      serviceA[i] = -1
      serviceB[bIndex] = -1
    } else {
      res.push([serviceA[i]])
    }
    bIndex++
    break
  }
}

console.log(res)

// 剩下的b元素组合(降序)：左右双指针，sum大于cpuCore, 最大数自己组合，left++；满足条件则组合, left++, right--
let serviceB2 = serviceB.filter((item) => item !== -1)
let left = 0
let right = serviceB2.length - 1
while (left < right) {
  if (serviceB2[left] + serviceB2[right] <= cpuCore) {
    res.push([serviceB2[left], serviceB2[right]])
    left++
    right--
  } else {
    res.push([serviceB2[left]])
    left++
  }
}

if (left === right) {
  res.push([serviceB2[left]])
}

console.log(res)

console.log(res.length)
