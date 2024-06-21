/* 
·         FileSystem() -- 系统初始化，当前目录在根目录 /，根目录下为空。

·         makeDir(string dirName) -- 在当前目录下创建一个新的目录，若目录名dirName和当前目录下的文件名或目录名重复，则创建失败，返回 false； 否则创建成功，返回 true。

·         createFile(string fileName) -- 在当前目录下创建一个新的文件。若文件名fileName和当前目录下的文件名或目录名重复，则创建失败，返回 false； 否则创建成功，返回 true。

·         changeDir(string pathName) -- 切换当前目录到pathName。 

o    首先，若 pathName 为""，当前目录保持不变，返回 true；

o    其次，若目录存在则切换成功，并返回 true；否则，直接返回 false 。 

注：pathName 以绝对路径 /xx/yy/zz 或者相对路径 xx/yy/zz 给出。

·         remove(string name) -- 删除当前目录下名称为name的文件或目录。

o    若存在则删除成功，并返回 true；否则，直接返回 false 。

o    注：删除目录时，除删除目录本身外，还需删除该目录下的所有子目录和文件。

·         listDir() -- 返回当前目录下的目录和文件。目录在前、文件在后，各自按字典序升序。

o    注：返回结果不含子目录下的内容。

注意：不要直接调用操作系统相关命令在平台真实操作文件系统。

输入
每行表示一个函数调用，初始化函数仅首行调用一次，累计函数调用不超过 1000 次。
fileName、dirName、name 仅含小写字母，长度范围皆为 [1, 100]
pathName 仅含小写字母和 /, 0 <= pathName.length < 1000，注：不包含 .. 或者.

注：pathName 不为 "" 时为合法目录名，末尾可能带一个 /。

输出
答题时按照函数/方法原型中的要求（含返回值）进行实现，输出由框架完成（其中首行固定输出 null）

样例1
输入：

FileSystem()
makeDir("dirc")
makeDir("dirb")
makeDir("dirc")
listDir()
changeDir("dirc/")
createFile("fileb")
makeDir("dirb")
createFile("dirb")
listDir()
changeDir("/dirb/dirc")
输出：

null
true
true
false
["dirb", "dirc"]
true
true
true
false
["dirb", "fileb"]
false
解释：

FileSystem() // null
makeDir("dirc") // true
makeDir("dirb") // true
makeDir("dirc") // false，重复
listDir() // ["dirb", "dirc"]，注意：目录名末尾不要额外加 /
changeDir("dirc/") // true，末尾带了一个 / ，等同于目录 dirc！！！
createFile("fileb") // true
makeDir("dirb") // true
createFile("dirb") // false，重复
listDir() // ["dirb", "fileb"]
changeDir("/dirb/dirc") // false，目录不存在
*/

/* 
route: [{name: ''，pos: true, children: [{name: '', children: []}, {name: ''}]}] pos：标记当前所处目录
curPathName: 'xxx/xxx/xxxx'
*/
class FileSystem {
  constructor() {
    this.route = [{ name: '', pos: true, children: [] }]
  }

  makeDir(dirName) {
    // 在当前目录下创建一个新的目录，若目录名dirName和当前目录下的文件名或目录名重复，则创建失败，返回 false； 否则创建成功，返回 true
    return this.create(dirName, 'dir')
  }

  createFile(fileName) {
    // 在当前目录下创建一个新的文件。若文件名fileName和当前目录下的文件名或目录名重复，则创建失败，返回 false； 否则创建成功，返回 true。
    return this.create(fileName, 'file')
  }

  create(dirName, type) {
    let res = false
    const set = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        const { name, pos, children = [] } = arr[i]
        // console.log(name, pos);
        if (pos) {
          const index = children.findIndex(item => item.name === dirName)
          if (index > -1) {
            res = false
          } else {
            arr[i].children = [...children, type === 'file' ? { name: dirName } : { name: dirName, children: [] }]
            res = true
          }
        } else {
          set(children)
        }
      }
    }
    set(this.route)
    return res
  }
  changeDir(pathName) {
    /* 
    切换当前目录到pathName。 

o    首先，若 pathName 为""，当前目录保持不变，返回 true；

o    其次，若目录存在则切换成功，并返回 true；否则，直接返回 false 。 

注：pathName 以绝对路径 /xx/yy/zz 或者相对路径 xx/yy/zz 给出。(特殊情况：xx, 没有斜杠/)
    */

    // 相对路径--当前目录往下查找
    // 绝对路径--根目录往下查找
    // 找--找到(list[0] === 当前name，且为目录)--原位置pos = false, 现位置pos = true
    let res = true
    if (!pathName) {
      return res
    }
    let list = [pathName]
    // TODO (特殊情况：xx, 没有斜杠/,)
    if (pathName.includes('/')) {
      list = pathName.split('/')
    }
    // 'dirc/' ， 去除 '/‘
    list.length > 0 && list[list.length - 1] === '' && list.pop()

    // 找当前路径，找到后再找当前路径下的相对路径
    //TODO 递归，一定要写返回值！！！how——在递归外面包一个函数
    const findPath = (arr) => {
      let result = false
      const find = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const { pos } = arr[i]
          if (pos) {
            result = this.change(arr[i].children || [], list)  //TODO ！！children可能为undefined
          } else {
            // ！！！return会终止for循环、终止函数 
            // 考虑没有children的情况
            find(arr[i].children || [])
          }
        }
      }
      find(arr)
      return result
    }


    if (list[0]) {
      // 当前目录往下查找
      res = findPath(this.route, list)
    } else {
      // 根目录往下查找
      res = this.change(this.route, list)
    }

    return res
  }

  change(arr, list) {
    let res = false
    const find = (arr, list) => {
      for (let i = 0; i < arr.length; i++) {
        const { name } = arr[i]
        if (name === list[0] && arr[i].children) {
          if (list.length > 1) {
            arr[i].children.length ? find(arr[i].children, list.slice(1)) : res = false
          } else {
            // 取消原位置标记
            this.cancelPos(this.route)
            arr[i].pos = true
            res = true
          }
        }
      }
    }
    find(arr, list)
    return res
  }

  cancelPos(arr) {
    for (let i = 0; i < arr.length; i++) {
      const { pos } = arr[i]
      if (pos) {
        arr[i].pos = false
        break
      } else {
        this.cancelPos(arr[i].children || [])
      }
    }
  }

  remove(name) {
    /* 
    删除当前目录下名称为name的文件或目录。

o    若存在则删除成功，并返回 true；否则，直接返回 false 。

o    注：删除目录时，除删除目录本身外，还需删除该目录下的所有子目录和文件。
    */
    let res
    const find = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        const { pos, children = [] } = arr[i]
        if (pos) {
          const index = children.findIndex(item => item.name === name)
          arr[i].children = children.filter(item => item.name !== name)
          if (index > -1) {
            res = true
          } else {
            res = false
          }
        } else {
          find(children)
        }
      }
    }
    find(this.route)
    return res
  }

  listDir() {
    /* 
    返回当前目录下的目录和文件。目录在前、文件在后，各自按字典序升序。
    返回结果不含子目录下的内容
    */
    let res = []
    const find = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        const { pos, children = [] } = arr[i]
        if (pos) {
          const dir = children.filter(item => item.children).map(item => item.name)
          const file = children.filter(item => !item.children).map(item => item.name)
          res = [...dir.sort(), ...file.sort()]
        } else {
          find(arr[i].children || [])
        }
      }
    }
    find(this.route)
    return res
  }
}

const sys3 = new FileSystem()
console.log(sys3.changeDir("/"))
console.log(sys3.createFile("bin"))
console.log(sys3.listDir())
console.log(sys3.createFile("home"))
console.log(sys3.listDir())
console.log(sys3.changeDir(""))
console.log(sys3.makeDir("dirki"))
console.log(sys3.remove("dirki"))
console.log(sys3.makeDir("dirkb"))
console.log(sys3.changeDir("/dirkb/"))
console.log(sys3.listDir())
console.log(sys3.remove("error"))
console.log(sys3.makeDir("dirkg"))
console.log(sys3.listDir())
console.log(sys3.remove("dirkg"))
console.log(sys3.listDir())
console.log(sys3.createFile("lib"))
console.log(sys3.makeDir("dirkg"))
console.log(sys3.makeDir("dirkd"))
console.log(sys3.makeDir("dirkg"))
console.log(sys3.remove("dirkd"))
console.log(sys3.makeDir("usr"))
console.log(sys3.createFile("opt"))
console.log(sys3.listDir())
console.log(sys3.changeDir("/dirkb/usr/"))
console.log(sys3.listDir())
console.log(sys3.changeDir("/dirkb/usr/"))
console.log(sys3.listDir())
console.log(sys3.remove("error"))
console.log(sys3.changeDir("/dirkb/usr/"))
console.log(sys3.changeDir("/dirkb/usr/"))
console.log(sys3.remove("error"))
console.log(sys3.listDir())
console.log(sys3.remove("error"))
console.log(sys3.listDir())
console.log(sys3.makeDir("dirkd"))
console.log(sys3.listDir())
console.log(sys3.createFile("filekj"))
console.log(sys3.changeDir("dirkb/usr/dirkd/"))
console.log(sys3.changeDir("/dirkb/usr/dirkd/"))
console.log(sys3.makeDir("tmp"))
console.log(sys3.remove("tmp"))
console.log(sys3.listDir())

// const sys2 = new FileSystem()
// console.log(sys2.makeDir("etc"))
// console.log(sys2.makeDir("dirkh"))
// console.log(sys2.makeDir("dirkg"))
// console.log(sys2.listDir())
// console.log(sys2.makeDir("mnt"))
// console.log(sys2.changeDir("mnt/"))
// console.log(sys2.listDir())
// console.log(sys2.makeDir("mnt"), JSON.stringify(sys2.route))
// console.log(sys2.changeDir("mnt"), JSON.stringify(sys2.route))
// console.log(sys2.makeDir("tmp"))
// console.log(sys2.makeDir("usr"))
// console.log(sys2.listDir())
// console.log(sys2.changeDir("/mnt/mnt/"))
// console.log(sys2.listDir())

// const sys = new FileSystem()
// console.log(sys.makeDir("dirc"), JSON.stringify(sys))
// console.log(sys.makeDir("dirb"), JSON.stringify(sys))
// console.log(sys.makeDir("dirc"), JSON.stringify(sys))
// console.log(sys.listDir())
// console.log(sys.changeDir("dirc/"))
// console.log(sys.createFile("fileb"), JSON.stringify(sys))
// console.log(sys.makeDir("dirb"), JSON.stringify(sys))
// console.log(sys.createFile("dirb"), JSON.stringify(sys))
// console.log(sys.listDir())
// console.log(sys.changeDir("/dirb/dirc"))

/*
null
true
true
false
["dirb", "dirc"]
true
true
true
false
["dirb", "fileb"]
false
*/


// const sys1 = new FileSystem()
// console.log(sys1.listDir())
// console.log(sys1.changeDir(""))
// console.log(sys1.createFile("gateway"))
// console.log(sys1.makeDir("home"))
// console.log(sys1.changeDir("gateway"))
// console.log(sys1.makeDir("etc"))
// console.log(sys1.listDir())
// console.log(sys1.remove("gateway"), JSON.stringify(sys1))
// console.log(sys1.changeDir("etc/"), JSON.stringify(sys1))
// console.log(sys1.createFile("pip"), JSON.stringify(sys1))
// console.log(sys1.changeDir("/etc/"))
// console.log(sys1.listDir())
// console.log(sys1.changeDir("/"))
// console.log(sys1.remove("etc"))
// console.log(sys1.listDir())

// null
// []
// true
// true
// true
// false
// true
// ["etc", "home", "gateway"]
// true
// true
// true
// true
// ["pip"]
// true
// true
// ["home"]
