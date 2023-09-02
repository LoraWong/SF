// tag


// 
let strA = 'badc'
// let strB = 'abc'
let strB = 'bac'

let res = 0

while (true) {

  // 遍历A中元素，查找 在 strB中的索引
  // 找不到则终止循环
  // 全部找到则替换对应元素，继续下一次循环查找
  // 如何 确保顺序不改变？上一个查找到的索引 小于 下一个查找到的索引
  let count = 0
  // 上一个查找到的索引 
  let last = -1
  for(let i=0; i<strB.length; i++) {
    let index = strA.indexOf(strB[i])
    if(index === -1) break
    // 当前找到的元素 在上一个找到元素的 右边
    if( last < index){
      count++
      strA = strA.slice(0, index) + '_' + strA.slice(index+1)
      last = index
    }
  }
  if(count !== strB.length){
    break
  } else {
    res++
  }
}

console.log(res,strA)
