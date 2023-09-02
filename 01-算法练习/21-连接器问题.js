
let range = [[1,10],[15,20],[18,30],[33,40]]

let con = [5,4,3,2]


// 合并区间
let rangCon = [range[0]]

// 计算 无法合并的区间 距离
let res = []

for(let i=1; i<range.length; i++){
  let [start1, end1] = rangCon[rangCon.length-1]
  let [start2, end2] = range[i]
  if(start2 <= end1){
    // 有重叠
    rangCon.pop()
    // 合并
    rangCon.push([start1, Math.max(end1,end2)])
  } else {
    // 不重叠
    rangCon.push(range[i])
    // 计算 区间距离
    res.push(start2-end1)
  }
}


// 给区间降序排序
// 给 连接器降序排序
con.sort((a,b)=>b-a)
res.sort((a,b)=>b-a)

// 查找符合条件的连接器
while(con.length>0 && res.length>0){
  if(con.pop() >= res[res.length-1]){
    res.pop()
  }
}
// n个区间距离，剩下n+1个区间
console.log(res.length+1)
