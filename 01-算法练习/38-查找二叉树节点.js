

// 递归
// node 节点数组
// index 节点层级
// [[],[],[]]  二维数组存储 节点


let arr = []

let res = []
function fn(node, index){
  if(!node.length){
    return 
  }


  // 创建 节点
   if(res[index]){
    res[index].push(node[0])
   } else {
    res[index] = [node[0]]
   }


  //  遍历子节点
  for(let i=1; i<node.length; i++){
    // 添加子节点
    fn(arr[node[i]], index+1)
  }
}


