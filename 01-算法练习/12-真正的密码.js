// 在一行中输入一个字符串数组，如果其中一个字符串的所有以索引0开头的子串在数组中都有，那么这个字符串就是潜在密码，在所有潜在密码中最长的是真正的密码，如果有多个长度相同的真正的密码，那么取 字典序·最大的为唯一的真正的密码，求唯一的真正的密码。

let str = 'nh he hel hell hello o ok n ni nin ninj ninja'

let str2 = 'a b c d f'
// 遍历每个字符
fn(str)
fn(str2)
function fn(str) {
  let arr = str.split(' ')
  // 潜在密码
  let res = []
  for(let i = 0; i < arr.length; i++) {
    if(judge(arr[i], arr)){
      res.push(arr[i])
    }
  }

  // 排序 // tag
  res.sort((a,b)=>{
    if(a.length !== b.length){
      // 要比较数字而非字符串，比较函数可以简单的用 a 减 b
      return b.length - a.length
    } else {
      // 字典排序
      // return b.charCodeAt() - a.charCodeAt()
      return b>a ? 1:-1
    }
  })
  // let max = res[0].length
  // res = res.filter(s=>s.length === max)
  console.log(res[0])
}

// 是否为 潜在密码
function judge(str, arr) {
  for (let i = 1; i < str.length; i++) {
    // 截取字符子串
    let sub = str.slice(0, i+1)

    // 是否在数组中
    if(!arr.includes(sub)) return false
  }
  return true
}
