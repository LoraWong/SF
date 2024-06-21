












/* 
在什么时候计算隔离天数：
地区风险变化，该地区所有人计算隔离天数
上升：
下降：
人员离开某地, 该人计算隔离天数
query，隔离中的人，计算隔离天数


RiskMonitor([100])null
-person: {0: {pos: 100 , pStatus: 1, pStart: -1, days: 0}}
// -person: {0: {pos: 100 , pStatus: 1, days: []}}
-region: {100: {rStatus: 1, start: -1, end: -1}}

increaseRisk(4, 100)null
-region: {100: {rStatus: -1, start: 4, end: -1}}
-person: {0: {pos: 100 , pStatus: -1, pStart: 4, days: 0}}
// -person: {0: {pos: 100 , pStatus: -1, days: [[4]]}}

decreaseRisk(10, 100)null
-region: {{rStatus: 1, start: 4, end: 10}}
-person: {0: {{pos: 100, pStatus: -1, days: 10-4}}} 6
// -person: {0: {pos: 100 , pStatus: -1, days: [[4]]}}

increaseRisk(17, 100)null
-person: {0: {pos: 100, pStatus: -1, days: 7+(17-10)}} 14
-region: {100: rStatus: -1, start: 17, end: -1}
// -person: {0: {pos: 100 , pStatus: -1, days: [[4]]}}

decreaseRisk(20, 100)null
-region: {100: {rStatus: 1, start: 17, end: 20}}
-person: {0: {{pos: 100, pStatus: -1, days: 14 + 20-17}}} 17
// -person: {0: {pos: 100 , pStatus: -1, days: [[4]]}}

travel(33, 0, 200)-1
-region: {100: {rStatus: 1, start: 17, end: 20}}
-person: {0: {{pos: 100, pStatus: -1, days: 17}}} 17
// -person: {0: {pos: 100 , pStatus: -1, days: [[4]]}}

travel(34, 0, 300)0
-region: {100: {rStatus: 1, start: 17, end: 20}, 300: {rStatus: 1, start: -1, end: -1}}
-person: {0: {{pos: 300, pStatus: 1, days: 17 + 13}}} 30
// -person: {0: {pos: 300 , pStatus: -1, days: [[4, 34]]}}

query(34)[30]

increaseRisk(40, 300)null
-region: {100: {rStatus: 1, start: 17, end: 20}, 300: {rStatus: -1, start: 40, end: -1}}
-person: {0: {{pos: 300, pStatus: -1, days: 17 + 13}}} 30
// -person: {0: {pos: 300 , pStatus: -1, days: [[4, 34], [40]]}}

query(40)[31]
-person: {0: {{pos: 200, pStatus: -1, days: 30 + 40-40}}} 30
地区 100 在第 10 天时第 1 次从高风险变成低风险；第 17 天时，人员 0 还在隔离中，地区 100 又变成高风险；第 20 天时，地区 100 再次从高风险变成低风险，从这天起再过 14 天（即第 34 天），人员 0 才能解除隔离。
*/

class RiskMonitor {
	constructor(arr) {
		this.person = {}
		this.region = {}
		arr.forEach((item, index) => {
			this.person[index] = {pos: item, pStatus: -1, days: []}
			this.region[item] = {rStatus: -1, start: -1, end: -1}
    })
	}
	increaseRisk(date, regionId) {
		this.update(regionId, date)
    this.region[regionId] = { rStatus: 1, start: date, end: -1 }
    Object.keys(this.person).forEach(key => {
      const {pos, pStatus, days} = this.person[key]
      if (pos === regionId) {
        // 解封：days: [[date]]
        // 未解封：不动
        if (pStatus === -1) {
          days.push([date])
          this.person[key] = {pos, pStatus: 1, days}
        }
      }
    })
	}
	decreaseRisk(date, regionId) {
    const {rStatus, start, end} = this.region[regionId]
		this.region[regionId] = { rStatus: -1, start, end: date }
	}
	travel(date, personId, regionId){
		// 人是否解封
    // 地区是否解封
    if (!Object.prototype.hasOwnProperty.call(this.region, regionId)) {
      this.region[regionId] = { rStatus: -1, start: -1, end: -1 }
    }
    const {rStatus, start, end} = this.region[regionId]
    // todo: 更新状态
    // this.query(date)
    this.cal(personId, date)
    // console.log('travel', this.person);
    const {pos, pStatus, days} = this.person[personId]
    if (pos === regionId) {
      return 1
    }
    if (rStatus === 1 || pStatus === 1) {
      return -1
    }
    this.person[personId] = {pos: regionId, pStatus, days}
    return 0
	}
	query(date) {
    let res = []
		Object.keys(this.person).forEach(key => {
      const {pos, pStatus, days} = this.person[key]
      this.update(pos, date)
      const sum = days.reduce((prev, cur) => {
        // days: [ [ 4, 34 ], [ 40 ] ], 开闭区间的计算差值[ 4, 34 ]，开区间[ 40 ] date - 40
        if (cur.length === 1) {
          return prev += date - cur [0] + 1
        } else {
          return prev += cur[1] - cur [0]
        }
      }, 0)
      res.push([Number(key), sum])
      console.log('query', sum, days, date, this.person);
    })
    // console.log('query', this.person);
    res.sort((a, b) => a[0] - b[0])
    return res.length ? res.map(item => item[1]) : []
	}
	update(regionId, date) {
    // 边界处理：该地区可能还没有人！！！
    if (!this.region[regionId]) {
      return
    }
		const {rStatus} = this.region[regionId]
    console.log('before update', this.region, regionId);
    // console.log('this.region[regionId]', this.region[regionId], date);
		// 该地区的隔离人
		Object.keys(this.person).forEach(key => {
			let {pos} = this.person[key]
      // console.log(rStatus, );
			if(pos === regionId && rStatus === -1) {
				// 在隔离
        // 地区解封：人是否解封？解封：date - end > 13 ， days: [start, start + 14], 更新状态; 未解封：
        // 地区被封：
        this.cal(key, date)
			}
		})
    // console.log('update', this.person, date, regionId, this.region);
	}
  cal(personId, date) {
    let {pos, pStatus, days} = this.person[personId]
    const {end, rStatus} = this.region[pos]
    if (rStatus === -1 && pStatus === 1 && date - end > 13) {
      days[days.length -1].push(end + 14)
      console.log('days[days.length -1][0] + 14', end + 14, end, days);
      this.person[personId] = {pos, pStatus: -1, days}
    }
  }
}


// const sys = new RiskMonitor([100])

// console.log(sys.increaseRisk(4, 100))

// console.log(sys.decreaseRisk(10, 100))

// console.log(sys.increaseRisk(17, 100))

// console.log(sys.decreaseRisk(20, 100))

// console.log(sys.travel(33, 0, 200))

// console.log(sys.travel(34, 0, 300))

// console.log(sys.query(34))

// console.log(sys.increaseRisk(40, 300))

// console.log(sys.query(40))

// const sys = new RiskMonitor([1])
// console.log(sys.increaseRisk(400, 0))
// console.log(sys.travel(567, 0, 0))
// console.log(sys.query(569))


const sys = new RiskMonitor([1])
console.log(sys.increaseRisk(300, 1))
console.log(sys.travel(357, 0, 0))
console.log(sys.query(369))
// 
console.log((255).toString(16));




/* 
RiskMonitor(int[] people)：系统初始化，people[i] 的下标表示人员编号，值表示所在地区的编号。初始时所有地区（包括没有人的地区）都为低风险，系统初始为第 0 天。

travel(int date, int peopleId, int regionId) ：在第 date 天时，人员 peopleId 前往目的地 regionId 旅行。

• 如果该人员已经在地区 regionId，则停留在原地，并返回 1；

• 如果该人员已被隔离，或目的地此时为高风险，则停留在原地，返回 -1；

• 否则旅行成功，该人员从 date 天（含）开始位于新地区，返回 0。

increaseRisk(int date, int regionId) ：在第 date 天（含）时，地区 regionId 变成高风险。当前该地区人员立即被隔离。

decreaseRisk(int date, int regionId) ：在第 date 天（含）时，地区 regionId 变成低风险。

• 如果该地区从 date 开始连续 14 天处于低风险，则第 date + 14 天（含），所有该地区的被隔离人员立即解除隔离。

query(int date)：在第 date 天（含）时，按人员编号升序，依次返回每个人累计被隔离的天数。



输入保证：

• 所有接口调用按照 date 非严格递增顺序

• 同一天中， increaseRisk 或 decreaseRisk 调用排在所有 travel 调用之前， query 调用排在所有其他调用之后

• 同一天同一地区调用 increaseRisk 和 decreaseRisk 的次数之和不会超过一次（即风险不会来回切换）。

• 调用 increaseRisk 或 decreaseRisk 一定会产生风险切换（比如不会出现已是高风险的地区再调用 increaseRisk 的情况）。

输入

每行表示一个函数调用，初始化函数仅首行调用一次，累计函数调用不超过 1000 次。

1 <= people.length <= 1000，0 <= peopleId < people.length, 0 <= people[i]（地区编号） <= 1000
0 <= regionId <= 1000
0 <= date <= 1000

输出

答题时按照函数/方法原型中的要求（含返回值）进行实现，输出由框架完成（其中首行固定输出 null）

样例1

输入：

RiskMonitor([1, 1])

travel(2, 1, 0)

increaseRisk(5, 1)

query(5)

travel(19, 1, 1)

decreaseRisk(21, 1)

query(22)

travel(25, 1, 1)

travel(35, 0, 0)

query(37)
 */
