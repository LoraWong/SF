function main(M,N,X){
 
  // 分支1.1(机考时删除此分支)
  if (M <= N)
      console.log(0)
  // 分支2.1
  else if (N < X){
      // 分支2.1.1
      if (N < math.floor(X / 2))
          M -= X - N

      console.log(parseInt(Math.ceil(M / X)) + 1)
  }
  else{
      // 分支2.2
      N -= X - 1
      let N_opposite = X - 1
      M -= X
      let M_opposite = X

      // 第一轮已经两次了
      let result = 2

      // 后续运输的初始规则（船上的羊多于狼1个）
      if (X % 2 == 0)
          sheep_boat = parseInt(Math.ceil(X / 2)) +  1
      else
          sheep_boat = parseInt(Math.ceil(X / 2))
      wolf_boat = X - sheep_boat

      //无解标记
      let flag = false
      while (M > 0){
          // 分支2.2.1
          if (M - sheep_boat > N - wolf_boat || (M == sheep_boat && N == wolf_boat)){
              M -= sheep_boat
              M_opposite += sheep_boat
              N -= wolf_boat
              N_opposite += wolf_boat
              result+=1
          }
          // 分支2.2.2
          else{
              tmp = M_opposite - N_opposite - 1
              if (tmp == 0){
                  console.log(0)
                  flag = true
                  break
              }
              
              N -= tmp
              N_opposite += tmp
              result+=1
          }
      }
      if (!flag)
          console.log(result)
  }

}

main(5, 3 ,3)