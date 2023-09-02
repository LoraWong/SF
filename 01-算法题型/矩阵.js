/**
 * @description: 矩阵相乘得到新矩阵
 * A[m * n] * B[k * m] ,得到C[n * k]
 * [m,n] x [n,p] 共会有n*p*m次乘法运算，运算后的矩阵为 [m,p]
 * A的每行 和 B的每列相乘
 */

let A = []
let B = []
let C = []

for(let i=0; i<n; i++){
  for(let j=0; j<k; j++){
    let sum = 0

    // 计算元素值:A的每行 和 B的每列相乘
    for(let s=0; s<m; s++){
      sum += A[s][i] * B[j][s]
    }

    C[i][j] = sum
    
  }
}



