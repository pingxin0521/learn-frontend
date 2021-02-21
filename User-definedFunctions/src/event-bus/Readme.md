### 手写事件总线

1. eventBus: 包含所有功能的事件总线对象
2. eventBus.on(eventName, listener): 绑定事件监听
3. eventBus.emit(eventName, data): 分发事件
4. eventBus.off(eventName): 解绑指定事件名的事件监听, 如果没有指定解绑所有

