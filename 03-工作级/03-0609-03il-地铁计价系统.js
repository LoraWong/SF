class MetroBillSys {
  constructor(cost, price, limit) {
    this.cost = cost
    this.price = price
    this.limit = limit
    this.account = {}
    this.remain = {}
  }

  recharge(id, amount) {
    if (this.account[id]) {
      this.account[id] += amount
    } else {
      this.account[id] = amount
    }
  }

  purchase(id) {
    if (this.account[id] && this.account[id] >= this.price) {
      this.account[id] -= this.price
      if (this.remain[id]) {
        this.remain[id] += this.limit
      } else {
        this.remain[id] = this.limit
      }
      return true
    }
    return false
  }

  commute(id, distance) {
    if (this.remain[id] > 0) {
      this.remain[id] -= 1
      return true
    } else {
      if (this.account[id] > 0) {
        this.account[id] -= this.cost[distance - 1]
        return true
      }
    }
    return false
  }

  query(id) {
    return [this.account[id] ? this.account[id] : 0, this.remain[id] ? this.remain[id] : 0]
  }
}

// let obj1 = new MetroBillSys([2, 5, 6], 10, 3)
// console.log(obj1)
// console.log([
//   obj1.query(101),
//   obj1.recharge(101, 24),
//   obj1,
//   obj1.commute(101, 1),
//   obj1.purchase(101),
//   obj1.commute(101, 2),
//   obj1.purchase(101),
//   obj1.query(101),
// ])

let obj1 = new MetroBillSys([3, 4, 5, 6, 7], 15, 4)
console.log(obj1)
console.log([
  obj1.recharge(101, 32),
  obj1.purchase(101),
  obj1.commute(101, 3),
  obj1.purchase(101),
  obj1.query(101),
  obj1.recharge(102, 5),
  obj1.commute(102, 4),
  obj1.query(102),
  obj1.commute(102, 3),
  obj1.recharge(102, 1),
  obj1.commute(102, 1),
])
