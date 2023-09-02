function main(nums) {
  let bit_info = new Array(100).fill(0); 
  for (let num of nums) {
      let num_binary = Number(num).toString(2);
      console.log(num_binary)
      if (num_binary == "0") {
          bit_info[0]++;
      } else {
          bit_info[num_binary.length]++;
      }
  }

  bit_info = bit_info.filter(function(a) {
      return a != 0
  })

  console.log(bit_info)

  let result = 0;
  // 数组的数值 进行累乘
  for (let i = 0; i < bit_info.length; i++) {
      for (let j = i + 1; j < bit_info.length; j++) {
          result += bit_info[i] * bit_info[j];
      }
  }
  console.log(result);

}

main([4, 3 ,5 ,2])

// 1：找规律，因为差异值大于相似值，其最高位必然不同，这样就会导致：
// 差异值的最高位为1，相似值的最高位为0！！！！。因此我们只要找到最高位为1和0的种类，然后相互组合即可。注意补0

// 方法二：回溯法进行元素组合，进行判断 该组合是否符合要求（可能超时

