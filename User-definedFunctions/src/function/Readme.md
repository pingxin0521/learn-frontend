#### call()& apply()& bind()

- call()
  - 语法: call(fn, obj, ...args)
  - 功能: 执行fn, 使this为obj, 并将后面的n个参数传给fn(功能等同于函数对象的call方法)
- apply()
  - 语法: apply(fn, obj, args)
  - 功能: 执行fn, 使this为obj, 并将args数组中的元素传给fn(功能等同于函数对象的apply方法)
- bind()
  - 语法: bind(fn, obj, ...args)
  - 功能: 给fn绑定this为obj, 并指定参数为后面的n个参数 (功能等同于函数对象的bind方法)

**实现说明**

- 区别call()/apply()/bind()
  - call(obj)/apply(obj): 调用函数, 指定函数中的this为第一个参数的值
  - bind(obj): 返回一个新的函数, 新函数内部会调用原来的函数, 且this为bind()指定的第一参数的值
  - 注意: 如果obj是null/undefined, this为window
- 应用
  - call()/apply()应用: 根据伪数组生成真数组
  - bind(): react中组件的自定义方法 / vue中的事件回调函数内部
- 自定义call()/apply()
  - 给obj添加一个临时方法, 方法名任意, 值为当前函数
  - 通过obj调用这个临时方法, 并将接收的参数传入
  - 删除obj上的这个临时方法属性
- 自定义实现bind()
  - 返回一个新函数
  - 在新函数内部通过原函数对象的call方法来执行原函数
  - 指定原函数的this为obj
  - 指定参数为bind调用的参数和后面新函数调用的参数

#### 函数节流与函数防抖

- 事件频繁触发可能造成的问题?

  - 一些浏览器事件:window.onresize、window.mousemove等，触发的频率非常高，会造成界面卡顿
  - 如果向后台发送请求，频繁触发，对服务器造成不必要的压力

- 如何限制事件处理函数频繁调用

  - 函数节流
  - 函数防抖

- 函数节流(throttle)

  - 理解:
    - 在函数需要频繁触发时: 函数执行一次后，只有大于设定的执行周期后才会执行第二次
    - 适合多次事件按时间做平均分配触发
  - 场景：
    - 窗口调整（resize）
    - 页面滚动（scroll）
    - DOM 元素的拖拽功能实现（mousemove）
    - 抢购疯狂点击（click）

- 函数防抖(debounce)

  - 理解:
    - 在函数需要频繁触发时: 在规定时间内，只让最后一次生效，前面的不生效。
    - 适合多次事件一次响应的情况
  - 场景:
    - 输入框实时搜索联想（keyup/input）

- 区别函数节流与防抖

  ![yJIkJe.png](https://s3.ax1x.com/2021/02/06/yJIkJe.png)



**API说明**

- throttle() 节流
  - 语法: throttle(callback, wait)
  - 功能: 创建一个节流函数，在 wait 毫秒内最多执行 `callback` 一次
- debounce() 防抖
  - 语法: debounce(callback, wait)
  - 功能: 创建一个防抖动函数，该函数会从上一次被调用后，延迟 `wait` 毫秒后调用 `callback`

