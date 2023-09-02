/**
 * @description: 素数、质数
 * 只能被1和它本身整除的数，（大于1
 */
// 判断是否素数
function helper(num){
  // Math.sqrt() 函数返回一个数的平方根
  for(let i=2; i <= Math.sqrt(num); i++){
      if(num % i === 0){
          return false
      }
      
  }
  return true
}

/**
 * @description: 分解质因数
 */


function fn1(num){
  let res = []
  for(let i=2; i *i <num; i++){

    while(num % i === 0){
      res.push(i)
      num = num / i
    }
  }
  // 最后一个
  if(num>1){
    res.push(num)
  }
}

/**
 * @description: 将真分数分解为埃及分数
 * 分子为1的分数称为埃及分数。
 * 现输入一个真分数(分子比分母小的分数，叫做真分数)，请将该分数分解为埃及分数。如：8/11 = 1/2+1/5+1/55+1/110。
 */
// a/b
// 下一次的分母 c= b/a +1; a = a- b % a; b = b * c

function fn(a, b){
    let c = (b / a) + 1
     a = a - b%a
     b = b * c

}