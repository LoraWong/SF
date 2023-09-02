
// 2：贪心 +单调栈，关键在于怎么剔除多余的重复元素，
// 当前数字大于栈尾数字，且栈尾数字出现超过2次，那么为了选出最大元素，需要剔除栈尾数字，放入当前数字。

let str = '5445795045'

// 统计 数字个数
let count = {}
for(let i = 0; i < count.length; i++){
  if(count[str[i]]){
    count[str[i]] += 1
  } else {
    count[str[i]] = 1
  }
}

// 统计 放入栈中 字符个数(默认0)
let vis = {}

// 栈：存放遍历的数字
let res = []


for(let i = 0; i < str.length; i++) {
  
  // 放入栈中的个数已经为2 则不需要再 入栈
  if(vis[str[i]] === 2){
    count[res[res.length-1]] -= 1
    continue
  }

  // 当前 数字 大于 栈尾数字，且 栈尾 数字个数大于2，则可以剔除栈尾数字

  while(str[i] > res[res.length-1] && count[res[res.length-1]] > 2){
    // 剔除栈尾数字
    vis[res[res.length-1]] -= 1
    count[res[res.length-1]] -= 1
    res.pop()
  }


  // 不符合条件 放入栈中
  if([str[i]]){
    vis[str[i]] += 1
  } else {
    vis[str[i]] = 1
  }
  res.push(str[i])
}