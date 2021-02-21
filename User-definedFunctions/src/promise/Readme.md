## 手写Promise

1. 定义整体结构
2. Promise构造函数的实现
3. promise.then()/catch()的实现
4. Promise.resolve()/reject()的实现
5. Promise.all/race()的实现
6. Promise.resolveDelay()/rejectDelay()的实现

### what

promise是js中进行异步编程的新的解决方案

具体表达：

从语法上来说：promise是一个构造函数

从功能上说：promise对象用来封装一个异步操作并可以获取其结果

**promise状态**

- padding： 初始状态

- resolved/fillfulled： 成功状态

- rejected：失败状态


想改变这三个状态必须要通过resolve()或者reject()这两个方法，resolve（）可以将pending转换为resolved，rejected（）可以将pending转换为rejected。并且将得到的数值存储在内部的data里面。并且这状态一旦转换是不可逆的。

说明 ： 

- 只有这两种，且一个promise对象只能改变一次
- 无论成功还是失败，都只会由一个数据结果；
- 成功的结果数据一般称为value，失败的结果一般成为reason

### promise包含的内容

- promise构造函数：Promise(excutor){}

- excutor函数：同步执行(resolve,reject)=>{}

- resolve函数：内部定义成功时我们调用的函数 value=>{}

- reject函数：内部定义失败时我们调用的函数 reason=>{}

说明：excutor会在promise内部立即同步回调，异步操作在执行器中执行

Promsie的原型对象含有then，catch这两个方法

- then这个方法可以接受两个参数，一个成功的回调，一个失败的回调。也就是onResolved和onRejected
- catch这个方法只可以接受一个参数，失败的回调，也就是onRejected
- 并且then这个方法，是返回一个新的promise对象，它里面的执行方法也是异步的
- 触发then的时候，也会有三个可能，一个是状态为resolved时，一个是状态为rejected时，一个是状态为pending时
- Promise的结果根据执行的结果返回
