

// 物品数量： items[i] 第i号物品的最大数量
// 物品价格： price[i][j] j: 第i号物品在第j天的价格
// 最大利润 = 上一次的最大利润 + （明天的价格 - 今天的价格）*物品数量


let max = 0
// 遍历商品
for(let i=0; i<num; i++){
  price = price[i]
  // 遍历天数
  for(let j=0; j<day-1; j++){
    // 如果明天涨价，利润 = 今天的涨价差值 + 昨天的最大利润
    if(price[j] < price[j+1]){
      max += (price[j+1] - price[j]) * item[i]
    }
  }
}

