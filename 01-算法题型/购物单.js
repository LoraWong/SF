const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let line1 = await readline();
    let [price, num] = line1.split(" ").map(Number);

    // dp[i][j] 最大满意度
    // i 物品编号；j 容量
    // 不放i：dp[i-1][j]
    // 放i：dp[i-1][j-weight[i]] + satify[i]
    async function main(total, num) {
        // 初始化数组
        // 容量
        let weight = new Array(num + 1).fill().map(() => new Array(3).fill(0));
        // 满意度
        let satify = new Array(num + 1).fill().map(() => new Array(3).fill(0));
        total /= 10; //价格是10的整数倍（缩小递推次数
        for (let i = 1; i <= num; i++) {
            let str = await readline();
            let [v, p, q] = str.split(" ").map(Number);
            //价格是10的整数倍
            v = v / 10;
            // 满意度
            let s = v * p;
            if (q === 0) {
                // 主件
                weight[i][0] = v;
                satify[i][0] = s;
            } else if (weight[q][1] === 0) {
                // 附件
                weight[q][1] = v;
                satify[q][1] = s;
            } else {
                weight[q][2] = v;
                satify[q][2] = s;
            }
        }
        // 初始化dp，所有值均为0
        let dp = new Array(num + 1)
            .fill()
            .map(() => new Array(total + 1).fill(0));
        // 遍历物品
        for (let i = 1; i <= num; i++) {
                let mainWeight = weight[i][0];
                let subWeight1 = weight[i][1];
                let subWeight2 = weight[i][2];
                let mainSatify = satify[i][0];
                let subSatify1 = satify[i][1];
                let subSatify2 = satify[i][2];
            // 遍历容量
            for (let j = 1; j <= total; j++) {
                // 不放i物品（超重
                let dp_no_i = dp[i - 1][j];
                // 放 i 物品（只主件
                let dp_i = dp[i - 1][j - mainWeight] + mainSatify;
                // 放 i 物品和附件1
                let dp_i_sub1 =
                    dp[i - 1][j - mainWeight - subWeight1] +
                    mainSatify +
                    subSatify1;
                // 放 i 物品和附件2
                let dp_i_sub2 =
                    dp[i - 1][j - mainWeight - subWeight2] +
                    mainSatify +
                    subSatify2;
                // 放i 物品和2个附件
                let dp_i_sub1_sub2 = dp[i - 1][j - mainWeight - subWeight1 - subWeight2] +
                        mainSatify +
                        subSatify1 +
                        subSatify2;
                if (j < mainWeight) {
                    // 不放i
                    dp[i][j] = dp_no_i;
                } else if (
                    j >= mainWeight &&
                    j < mainWeight + subWeight1 &&
                    j < mainWeight + subWeight2
                ) {
                    // 放i
                  dp[i][j] =  Math.max(dp_no_i, dp_i)
                } else if (
                    j >= mainWeight + subWeight1 &&
                    j < mainWeight + subWeight2
                ) {
                    // i + 附件1
                   dp[i][j] = Math.max.apply(null, [dp_i, dp_no_i, dp_i_sub1])
                } else if (
                    j >= mainWeight + subWeight2 &&
                    j < mainWeight + subWeight1
                ) {
                    // i + 附件2
                    dp[i][j] = Math.max.apply(null, [dp_i, dp_no_i, dp_i_sub2])
                } else if (j >= mainWeight + subWeight1 + subWeight2) {
                    // i + 附件1 + 附件2
                    dp[i][j] = Math.max.apply(null, [dp_i, dp_no_i, dp_i_sub1, dp_i_sub2, dp_i_sub1_sub2])
                        
                }
            }
        }


        console.log(dp[num][total]*10)
    }

    main(price, num);

})();
