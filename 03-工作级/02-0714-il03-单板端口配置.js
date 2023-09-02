// 一个路由器 ---多个槽位
// 一个槽位---一个单板
// 一个单板--多个接口
// 接口---传输速度：0，1，2，3（0，100，200，500）

// 由于不知道有多少个槽位，使用 map结构 保存数据！！！

class BoardSystem {
  constructor() {
    // 使用 map结构 保存数据
    this.board = {}
  }
  // 增加单板
  addBoard(slot, boardInfo) {
    // boardInfo[i] = [port_1, speed_i] // [端口号，端口速度]
    // slot 槽位
    if (this.board[slot]) {
      return false
    } else {
      this.board[slot] = boardInfo
      return true
    }
  }
  // 删除单板
  delBoard(slot) {
    if (this.board[slot]) {
      let flag = this.board[slot].every((item) => item[1] === 0)
      if (flag) {
        delete this.board[slot]
        return true
      }
    }
    return false
  }
  // 修改指定槽位上的接口速度
  modifyPort(slot, port, speed) {
    if (this.board[slot]) {
      for (let i = 0; i < this.board[slot].length; i++) {
        if (this.board[slot][0] === port) {
          this.board[slot][1] = speed
          return true
        }
      }
    }
    return false
  }
  // 查询所有速度不为0的接口，并排序--槽位升序，速度降序、端口号升序
  queryPort() {
    // 遍历 map 过滤出所有速度不为0的接口
    let res = []
    for (const key in this.board) {
      let val = this.board[key].filter((item) => item[1] !== 0)
      if (val.length > 0) {
        res.push([key, ...val])
      }
    }

    // 排序
    res.sort((a, b) => a[0] - b[0])
    res.sort((a, b) => {
      if (a[0] === b[0]) {
        return b[2] - a[2]
      }
      if (a[1] === b[1]) {
        return a[1] - b[1]
      }
    })
    return res
  }
}
