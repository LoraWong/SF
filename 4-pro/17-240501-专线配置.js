/* 
【软件认证】专线配置

现给出设备侧的初始配置 configs，该配置数据已同步到网管侧，作为网管侧的初始配置。configs[i] = [id1, id2] 表示端口id1和端口id2之间存在一条专线，两个端口均被占用。 注：专线是双向的，从端口id1到端口id2与从端口id2到端口id1是等价的。

用户在网管侧发起了一系列配置请求，记录于 batchReqs 中，batchReqs[i] = [opType, id1, id2]：

opType 取值为字符a: 表示新建一条端口id1和端口id2之间的专线。如果端口id1和端口id2当前（在网管侧的配置中）均未被占用，则成功新建一条专线，独占这两个端口； 否则，不做任何处理。

opType 取值为字符d: 表示删除一条端口id1和端口id2之间的专线。如果存在，则删除这条专线，并释放这两个端口；否则，不做任何处理。
网管侧依次处理 batchReqs 中的所有配置请求，根据请求更新网管侧配置，再向设备侧做一次简化命令的批量提交。

简化命令：尽可能用最少的命令下发到设备，使得两边配置一致。
请返回需要批量提交的命令列表（可能为空列表 []）：所有删除命令排在所有新建命令之前，所有删除和新建命令各自按端口id1升序。列表元素格式同配置请求，且 id1 < id2 。

输入
第一个参数是 configs，0 <= configs.length <= 50，元素为合法专线且各不相同
第二个参数是 batchReqs，1 <= batchReqs.length <= 100，opType 仅为"a"或"d"

0 <= id1 < id2 <= 100

输出
需要批量提交的命令列表，可能为空列表 []

样例1
复制输入：
[[2, 3], [4, 5]]
[["a", 0, 1], ["a", 5, 6], ["d", 0, 1], ["d", 1, 2], ["a", 0, 6], ["d", 4, 5], ["a", 1, 4]]
复制输出：
[["d", 4, 5], ["a", 0, 6], ["a", 1, 4]]
解释：
配置请求处理过程如下：
["a", 0, 1]：配置成功。
["a", 5, 6]：配置失败，因为端口 5 已被专线 [4, 5] 占用。
["d", 0, 1]：配置成功，先前配置的专线 [0, 1] 被删除。
["d", 1, 2]：配置失败，[1, 2] 这条专线不存在。
["a", 0, 6]：配置成功。
["d", 4, 5]：配置成功，初始配置中存在的专线 [4, 5] 被删除。
["a", 1, 4]：配置成功。
处理完这些请求后，网管侧最新配置：[2, 3], [0, 6], [1, 4]
经分析，初始配置中的专线 [4, 5] 需要被删除；[0, 6], [1, 4] 两条专线需要新增。
按题目排序要求，网管需向设备批量提交以下命令：[["d", 4, 5], ["a", 0, 6], ["a", 1, 4]]
*/


getBatchCmds = (configs, batchReqs) => {
  /* 
  记录占用中的设备，using = []
  执行命令后的配置， reqsConfig = []
  添加后，using中增加占用的设备
  删除后，using中删除释放的设备
  对比执行命令前后的配置，增加的配置，添加a命令；减少的配置，添加d命令
   */
  const isEqual = (arr1, arr2) => {
    return arr1.join('') === arr2.join('')
  }

  const using = new Set()

  configs.forEach(([id1, id2]) => {
    using.add(id1).add(id2)
  })
  let reqsConfig = JSON.parse(JSON.stringify(configs))
  batchReqs.forEach(element => {
    const [op, id1, id2] = element
    if (op === 'a') {
      const added = using.has(id1) || using.has(id2)
      if (!added) {
        reqsConfig.push([id1, id2])
        using.add(id1).add(id2)
      }
    }
    if (op === 'd') {
      // TODO 判断两个数组是否相等: arr1.join('') === arr2.join(') 或 JSON.stringify// 顺序相等; 引用类型无法使用===判断
      const del = reqsConfig.find(item => isEqual(item, [id1, id2]))
      if (del) {
        reqsConfig = reqsConfig.filter(item => !isEqual(item, [id1, id2]))
        // toUse.push(id1, id2)
        using.delete(id1)
        using.delete(id2)
      }
    }
    // console.log(reqsConfig, 'reqsConfig', element);
  })
  // console.log(reqsConfig, 'reqsConfig');
  // console.log(configs, 'configs');
  const add = reqsConfig.filter(item => !configs.find(s => isEqual(item, s))).map(s => ['a', ...s])
  const del = configs.filter(item => !reqsConfig.find(s => isEqual(item, s))).map(s => ['d', ...s])
  add.sort((a, b) => a[1] - b[1])
  del.sort((a, b) => a[1] - b[1])
  // console.log(del, 'del');
  console.log(add, 'add');



  return [...del, ...add]
}

console.log(getBatchCmds([[2, 3], [4, 5]],
  [["a", 0, 1], ["a", 5, 6], ["d", 0, 1], ["d", 1, 2], ["a", 0, 6], ["d", 4, 5], ["a", 1, 4]]));
