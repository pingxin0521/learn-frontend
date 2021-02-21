/* 
自定义消息订阅与发布
*/

const PubSub = {}

/* 
  {
    add: {
      token1: callback1, 
      token2: callback2
    },
    update: {
      token3: callback3
    }
  }
*/
let callbacksObj = {} // 保存所有回调的容器
let id = 0 // 用于生成token的标记

// 1. 订阅消息
PubSub.subscribe = function (name, cb) {
    const token = 'token_' + ++id
    const cbs = callbacksObj[name]
    if (!cbs) {
        callbacksObj[name] = {
            [token]: cb,
        }
    } else {
        callbacksObj[token] = cb
    }

    return token
}

// 2. 发布异步的消息
PubSub.publish = function (name, data) {
    const cbs = callbacksObj[name]
    if (cbs) {
        setTimeout(() => {
            Object.values(cbs).forEach(cb => {
                cb(data)
            })
        }, 0)
    }
}

// 3. 发布同步的消息
PubSub.publishSync = function (name, data) {
    const cbs = callbacksObj[name]
    if (cbs) {
        Object.values(cbs).forEach(cb => {
            cb(data)
        })
    }
}

/*
4. 取消消息订阅
  1). 没有传值, flag为undefined
  2). 传入token字符串
  3). msgName字符串
*/

PubSub.unsubscribe = function (flag) {
    if (flag === undefined) {
        callbacksObj = {}
    } else if (typeof flag === 'string') {
        if (flag.indexOf('token_') === 0) {
            const cbs = Object.values(callbacksObj)
                .find(cbs => cbs.hasOwnProperty(flag));
            if (cbs) {
                delete cbs[flag]
            }
        } else {
            delete callbacksObj[flag]
        }
    } else {
        throw new Error('如果传入参数, 必须是字符串类型')
    }
}

export default PubSub