// 给打印队列 按优先级排序

let arr = ['IN 1 1', 'IN 1 2', 'IN 1 3', 'IN 2 1', 'OUT 1', 'OUT 2', 'OUT 2']

let inArr = []
let outArr = []

arr.forEach((item, index)=>{
   let [type ,id, p] = item.split(' ')
  if(type === 'IN'){
    inArr.push([id, p, index+1])
  } else {

outArr.push(id)
  }
})

inArr.sort((a,b)=>b[1] - a[1])
// 排序后， 添加编号!!!
inArr.forEach((item, index)=>{
  inArr[index].push(index+1)
})

outArr.forEach(item=>{
  let index = inArr.findIndex(s=>s[0] === item)
  if(index !== -1){
    console.log(inArr[index][2])
    // 删除元素
    inArr.splice(index, 1)
  } else {
    console.log('NULL')
  }
})

console.log(inArr)