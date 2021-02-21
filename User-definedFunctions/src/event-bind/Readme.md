### 手写DOM事件监听(带委托)

事件冒泡的流程

- 基于DOM树形结构
- 事件在目标元素上处理后, 会由内向外(上)逐层传递
- 应用场景: 事件代理/委托/委派

![](https://s3.ax1x.com/2021/02/08/yUXTnf.png)

- 事件委托/代理

  - 将多个子元素的同类事件监听委托给(绑定在)共同的一个父组件上

  - 好处：

    - 减少内存占用(事件监听回调从n变为
    - 动态添加的内部元素也能响应

    

**API 相关**

- 语法：addEventListener(element, type, fn, selector)
- 说明：如果selector没有，直接给element绑定事件，如果selector有，将selector对应的多个元素的事件委托绑定给父元素element