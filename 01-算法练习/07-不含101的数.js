
// let input = '1 10'
let input = '10 20'

let [n,m] = input.split(' ').map(s=>Number(s))

// 遍历 所有整数
// 将整数转为 二进制字符
// 判断是否包含101
let count = 0
for(let i=n; i<=m; i++) {
  let str = i.toString(2)
  // console.log(str)
  if(!str.includes('101')) count++
}

console.log(count, n,m)

