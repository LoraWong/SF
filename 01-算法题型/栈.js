/**
 * @description: 火车进站
 * 使用栈保存数据（先进后出
 * 回溯（递归）
 */

let arr = [1, 2, 3]
let wait = []
let stack = []

// wait 即将进站的火车
// stack 已经进站的火车
// outs 已经出站的火车
let res = []
function dfs(wait, stack, outs){
  if(wait.length === 0 && stack.length === 0){
    res.push([...outs])
    return
  }

  // 进站
  if(wait.length >0){
    // wait 第一个 取出放入 stack最后
    stack.push(wait.shift())
    dfs(wait, stack, outs)
    // 回溯
    wait.unshift(stack.pop())
  }


  // 出栈
  if(stack.length >0){
    // stack最后一个 取出放入 outs最后一个
    outs.push(stack.pop())
    dfs(wait, stack, outs)
    stack.push(outs.pop())
  }
}


/**
 * @description: 括号相关运算
 */
/**
 * @description: 矩阵乘法计算量
 * (A(BC))
 * 括号处理：遇到矩阵，入栈；遇到右括号，说明当前栈中矩阵需要计算，栈中最后两个数出栈计算完后再入栈
 */
// 输出需要进行的乘法次数
function fn(){

  let stack = []
  let res = 0
  for(let i=0; i<rule.length; i++){
    // 遇到字母入栈
    if(/[A-Z]/.test(rule[i])){
        // 矩阵入栈
        stack.push(map[rule[i]])
    }
    // 遇到右括号，计算栈中后两个矩阵
    if(/[\)]/.test(rule[i])){
        if(stack.length < 2) return
        // 计算栈中后两个矩阵的相乘次数
        // 出栈
        // 注意矩阵顺序！！！！（计算要出栈
        let a = stack.pop() // 后一个矩阵
        let b = stack.pop() // 前一个矩阵
        // 相乘次数（注意矩阵顺序！！！！
         res += b[0] * a[1] * b[1]
        //  新生成的矩阵入栈
        stack.push([b[0],a[1]])
    }
}

}



