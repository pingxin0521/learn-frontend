#### 数组声明式系列方法

- **map**(): 返回一个由回调函数的返回值组成的新数组
- **reduce**(): 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值
- **filter**(): 将所有在过滤函数中返回 `true` 的数组元素放进一个新数组中并返回
- **find**(): 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 `undefined`。
- **findIndex**(): 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 `-1`。
- **every**(): 如果数组中的每个元素都满足测试函数，则返回 `true`，否则返回 `false。`
- **some**(): 如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

#### 数组去重

- 方法1: 利用forEach()和indexOf()
说明: 本质是双重遍历, 效率差些

- 方法2: 利用forEach() + 对象容器
说明: 只需一重遍历, 效率高些

- 方法3: 利用ES6语法: from + Set 或者 ... + Set
说明: 编码简洁

#### 数组合并与切片

- concat(): 合并
  - 语法: var new_array = concat(array, value1[, value2[, ...[, valueN]]])
  - 功能: 将n个数组或值与当前数组合并生成一个新数组, 原始数组不会被改变
- slice(): 切片
  - 语法: var new_array = slice(array, [begin[, end]])
  - 功能: 返回一个由 begin 和 end 决定的原数组的浅拷贝, 原始数组不会被改变

#### 数组扁平化

- 语法: flatten(array)

- 
  取出嵌套数组(多维)中的所有元素放到一个新数组(一维)中

- 
  如: [1, [3, [2, 4]]] ==> [1, 3, 2, 4]


#### 数组分块

- 语法: chunk(array, size)

- 
  功能: 将数组拆分成多个 size 长度的区块，每个区块组成小数组,整体组成一个二维数组

- 
  如: [1, 3, 5, 6, 7, 8] 调用chunk(arr, 4) ==> [[1, 3, 5, 6], [7,8]]


#### 数组取差异

- 语法: difference(arr1, arr2)

- 
  功能: 得到当前数组中所有不在arr中的元素组成的数组(不改变原数组)

- 
  例子: difference([1,3,5,7], [5, 8]) ==> [1, 3, 7]


#### 删除数组中部分元素

- pull(array, ...values):
  - 删除原数组中与value相同的元素, 返回所有删除元素的数组
  - 说明: 原数组发生了改变
  - 如: pull([1,3,5,3,7], 2, 7, 3, 7) ===> 原数组变为[1, 5], 返回值为[3,3,7]
- pullAll(array, values):
  - 功能与pull一致, 只是参数变为数组
  - 如: pullAll([1,3,5,3,7], [2, 7, 3, 7]) ===> 数组1变为[1, 5], 返回值为[3,3,7]

#### 得到数组的部分元素

- drop(array, count)
  - 得到当前数组过滤掉左边count个后剩余元素组成的数组
  - 说明: 不改变当前数组, count默认是1
  - 如: drop([1,3,5,7], 2) ===> [5, 7]
- dropRight(array, count)
  - 得到当前数组过滤掉右边count个后剩余元素组成的数组
  - 说明: 不改变当前数组, count默认是1
  - 如: dropRight([1,3,5,7], 2) ===> [1, 3]