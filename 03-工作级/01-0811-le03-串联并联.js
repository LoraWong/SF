// let records = [
//   [0, 1],
//   [1, 3],
//   [2, 2],
//   [3, 3],
//   [4, 1],
//   [4, 3],
// ]

// let limit = 3

let records = [
  [3, 3],
  [4, 1],
  [5, 2],
  [6, 1],
  [7, 3],
  [8, 1],
  [11, 3],
]
let limit = 4

// 重点｜｜｜ 遍历区间（标记 区间内每个时间点的开关状态），而不是遍历所有时间点！！！，重叠区间，会被覆盖，每个时间点可能会更新多次
// 记录 每个switch 的每个时间点的 开关状态，用 二维数组保存
records.sort((a, b) => a[0] - b[0])

let time = records[records.length - 1][0] + limit

let switchStatus = new Array(time + 1).fill().map((s) => new Array(3).fill(0))

// 遍历每个区间！！！！
for (let i = 0; i < records.length; i++) {
  let start = records[i][0]
  let switchId = records[i][1] - 1
  // 起始点的开关状态
  let startStatus = switchStatus[start][switchId]
  // 起始点为开，则当前区间开关闭合
  // 起始点为关，则当前区间开关打开
  if (startStatus === 0) {
    for (let j = start; j < start + limit; j++) {
      switchStatus[j][switchId] = 1
    }
  } else if (startStatus === 1) {
    for (let j = start; j < start + limit; j++) {
      switchStatus[j][switchId] = 0
    }
  }
}

let res = 0
for (let i = 0; i < switchStatus.length; i++) {
  let s1 = switchStatus[i][0]
  let s2 = switchStatus[i][1]
  let s3 = switchStatus[i][2]
  if (s1 && (s2 || s3)) {
    console.log(i)
    res++
  }
}
console.log(switchStatus, res)
