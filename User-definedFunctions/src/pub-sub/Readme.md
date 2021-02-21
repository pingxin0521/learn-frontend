### 手写消息订阅与发布

1. PubSub: 包含所有功能的订阅/发布消息的管理者
2. PubSub.subscribe(msg, subscriber): 订阅消息: 指定消息名和订阅者回调函数
3. PubSub.publish(msg, data): 异步发布消息: 指定消息名和数据
4. PubSub.publishSync(msg, data): 同步发布消息: 指定消息名和数据
5. PubSub.unsubscribe(flag): 取消订阅: 根据标识取消某个或某些消息的订阅