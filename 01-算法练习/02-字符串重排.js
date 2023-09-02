let str = 'My sister is in the house not in the yard'

let arr = str.split(' ')

let map = {}

for(let i=0; i<arr.length; i++){
  // 内部单词按字典排序
  arr[i] = arr[i].split('').sort().join('')

  // 统计每个单词出现的次数
  if(map.hasOwnProperty(arr[i])){
    map[arr[i]] += 1
  } else {
    map[arr[i]] = 1
  }
}


// 使用sort方法!!，
// 如果字母数降序，
// 字母数相同则按单词长度升序排序，
// 长度相同则按字典升序排序
arr.sort((a,b)=>{
  // a-b 升序  !!!!!
  if(map[a] !== map[b]){
    return map[b] - map[a]
  } else {
    if(a.length !== b.length){
    return a.length - b.length
  } else {
    return a - b
  }
  }
})

console.log(arr, map, arr.join(' '))