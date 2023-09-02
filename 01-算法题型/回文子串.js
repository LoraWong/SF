let str = 'cdabbacc'

// ABBA
// ABA
// 遍历字符，
// 以当前字符为中心向两边扩散，循环比较左右两边字符，
// 不相等则终止循环！！
// 满足arr[l] === arr[r]则拼接为新字符


function fn(str){
  let max = 0

  for(let i=0; i<str.length; i++){

    // ABBA
    let left = i
    let right = i + 1

    let temp = ''

    for(let l=left, r=right; l>=0, r<str.length; l--,r++){
      if(str[l] !== str[r]) break
      temp = str.slice(l, r+1)
    }

    max = Math.max(max, temp.length)

    // ABA
    left = i
    right = i+2
    for(let l=left, r=right; l>=0, r<str.length; l--,r++){
      if(str[l] !== str[r]) break
      temp = str.slice(l, r+1)
    }

    max = Math.max(max, temp.length)

  }

  console.log(max)
}

fn(str)

