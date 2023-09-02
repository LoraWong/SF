

var char_map = ["abc", "def", "ghi", "jkl", "mno", "pqr", "st", "uv", "wx", "yz"]
let nums = [7,8]

let charArr = nums.map((s)=>char_map[s])

let str = 'ux'
// 索引号分别对应 数组元素的字符串

// 根据输入的数字，生成 字符串数组
// 先利用递归排列组合
// 保存组合之前 进行过滤判断，写一个判断函数

// console.log(charArr)


let res = []
let path = []

dfs(0)
// index 数组索引值 
function dfs(index){
  if(index === charArr.length){
    // 判断 path中是否包含 指定字母
    if(!judge(str, path)){
      console.log(path.join(''))
    }
    return
  }

  // 遍历每个字符串
  for(let i=0; i<charArr[index].length; i++){
    // 选择一个字母
    path.push(charArr[index][i])
    // 从下一个字符串中 选择一个字母
    dfs(index+1)
    path.pop()
  }
}


function judge(str, arr){
  let count = 0
  for(let i=0; i<str.length; i++){
    // 包含全部 指定字符，则返回 true
    
    if(arr.includes(str[i])) {
      count++
    }
  }
  if(count=== str.length) {
    return true
  } else {
    return false
  }
  
}

