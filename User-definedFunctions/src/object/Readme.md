### 对象相关

- newInstance()
- myInstanceOf()
- mergeObject()
- clone1() / clone2()
- deepClone1() / deepClone2() / deepClone3() / deepClone4()

#### 自定义new

- 语法: newInstance(Fn, ...args)
- 功能: 创建Fn构造函数的实例对象

#### 自定义instanceof

- 语法: myInstanceOf(obj, Type)
- 功能: 判断obj是否是Type类型的实例
- 实现: Type的原型对象是否是obj的原型链上的某个对象, 如果是返回tru, 否则返回false

#### 合并多个对象

- 语法: object mergeObject(...objs)
- 功能: 合并多个对象, 返回一个合并后对象(不改变原对象)
- 例子:
  - { a: [{ x: 2 }, { y: 4 }], b: 1}
  - { a: { z: 3}, b: [2, 3], c: 'foo'}
  - 合并后: { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }

#### 对象/数组拷贝

**区别浅拷贝与深拷贝**

- 纯语言表达:
  - 浅拷贝: 只是复制了对象属性或数组元素本身(只是引用地址值)
  - 深拷贝: 不仅复制了对象属性或数组元素本身, 还复制了指向的对象(使用递归)
- 举例说明: 拷贝persons数组(多个人对象的数组)
  - 浅拷贝: 只是拷贝了每个person对象的引用地址值, 每个person对象只有一份
  - 深拷贝: 每个person对象也被复制了一份新的



#### 实现深拷贝

- 实现一: 大众乞丐版
  - 问题1: 函数属性会丢失
  - 问题2: 循环引用会出错
- 实现二: 面试基础版
  - 解决问题1: 函数属性还没丢失
- 实现三: 面试加强版本
  - 解决问题2: 循环引用正常
- 实现四: 面试加强版本2(优化遍历性能)
  - 数组: while | for | forEach() 优于 for-in | keys()&forEach()
  - 对象: for-in 与 keys()&forEach() 差不多