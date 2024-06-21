/* 
请实现一个简易二进制编辑器，合法的二进制数字不能有前导 0 。前导 0 定义为：从左向右第一个非 0 数字之前的所有 0，或者全 0 数字的最后一个 0 之前的所有 0 。合法数字如 110`1、0、1、100，非法如 00、01 。

初始有一个二进制数字字符串（可能为空），光标默认在最后一个数字的右侧。 需要支持如下操作：

·         0：在光标位置插入一个数字 0，光标停留在新插入数字的右侧。如果插入会导致出现前导 0，则不做任何处理。

·         1：在光标位置插入一个数字 1，如果出现前导 0，需要将前导 0 删除；光标停留在新插入数字的右侧。

·         B：删除光标位置左侧相邻的一个数字，光标左移一位：

o    如果删除后出现前导 0，需要将前导 0 删除，且光标停留在最左侧。
例如：1001101，光标在第一个 1 的右侧，进行 B操作后，则数字变为 1101。

o    如果光标已在最左侧，则不做任何处理。

·         L：光标左移一个位置。如果光标已在最左侧，则不做任何处理。

·         R：光标右移一个位置。如果光标已在最右侧，则不做任何处理。

现给出初始二进制数字字符串inputStr，以及一系列操作cmds，请依次进行编辑操作，最后返回编辑器内二进制数字字符串。

输入
第一个参数是 inputStr，0 <= inputStr.length <= 1000，仅以 0 或 1 组成的二进制数字字符串，或空串 ""
第二个参数是一系列操作 cmds，1 <= cmds.length <= 1000, cmds[i]仅为 0、1、B、L、R 之一

用例保证：1）输入不含前导 0； 2）在整个操作过程中，数字长度不超过 2000

输出
一个二进制数字字符串，可能为空字符串 ""




样例1
输入：

"10"
"0LLB0R1"
输出：

"1"
解释：

初始光标在最右侧
0 操作后，字符串为 100，光标仍在最右侧  inputStr = 100    pos = 2
L 操作后，光标在两个 0 之间   inputStr = 100    pos = 1
L 操作后，光标在1 右侧  inputStr = 100    pos = 0
B 操作后，为 0，光标在最左侧。注：删除 1 后为 00（出现前导 0），删除前导 0 后变为 0（0 是合法的二进制数字） inputStr = 0    pos = -1
0 操作时，只有一个 0，如果再插入 0，就会出现前导 0，所以忽略此操作。
R 操作，把光标右移到 0 后面 inputStr = 0    pos = 0
1 操作，插入 1 ，并把前导 0 删除，结果为 1 inputStr = 1    pos = 0
________________________________________________________________________________________________

样例2
输入：

"10"
"0LLBB1RRRBB"
输出：

""
解释：

0LLB 后为 0，光标在最左侧
0LLBB 后仍为 0 （光标已在最左侧，不做任何处理）
0LLBB1 后为 10
最终结果为 ""
*/

/* 
str: string, pos: number 光标位置
*/
class TestB {
  constructor(str) {
    this.str = str
    this.pos = str.length - 1
  }

  addZero() {
    // console.log(this)
    const str = this.str.substring(0, this.pos+1) + '0' + this.str.substring(this.pos + 1)
    if (this.check(str)) {
      this.str = str
      this.pos += 1
    }
    console.log(this);
  }

  addOne() {
    const str = this.str.substring(0, this.pos+1) + '1' + this.str.substring(this.pos + 1)
    if (this.check(str)) {
      this.str = str
      this.pos += 1
    } else {
      this.deleteFrontZero(str)
    }
    console.log(this);
  }

  left() {
    this.pos !== -1 && (this.pos -= 1)
  }

  right() {
    this.pos !== this.str.length -1 && (this.pos += 1)
  }

  delete() {
    const str = this.str.substring(0, this.pos) + this.str.substring(this.pos + 1)
    if (this.check(str)) {
      this.str = str
      this.left()
    } else {
      this.deleteFrontZero(str)
    }
    console.log(this);
  }
  deleteFrontZero(str) {
    const pos = str.split('').findIndex(s => s !== '0')
      if (pos === -1) {
        this.str = '0'
        this.pos = -1
      } else if (pos > 0) {
        this.str = str.substring(pos)
        this.pos = -1
      }
  }
  check(str) {
    // 前导 0 定义为：从左向右第一个非 0 数字之前的所有 0，或者全 0 数字的最后一个 0 之前的所有 0 。合法数字如 110`1、0、1、100，非法如 00、01 
    if (str.length < 2) {
      return true
    }
    const pos = str.split('').findIndex(s => s !== '0')
    if (pos === -1) {
      return false
    } else if (pos === 0) {
      return true
    } else {
      return false
    }
  }

  main(op) {
    const funcMapping = {
      '0': this.addZero,
      '1': this.addOne,
      'B': this.delete,
      'L': this.left,
      'R': this.right
    }
    op.split('').forEach(item => {
      funcMapping[item].call(this)
    })
  }
}

const sys = new TestB("10")
sys.main("0LLBB1RRRBB")
console.log(sys.str);
