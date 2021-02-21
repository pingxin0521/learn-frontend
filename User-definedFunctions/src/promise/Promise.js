/*
自定义Promise函数模块：IIFE
 */

(function (global) {
    const PENDING = 'pending' // 初始未确定的状态
    const RESOLVED = 'resolved' // 成功的状态
    const REJECTED = 'rejected' // 失败的状态
    /*
    Promise构造函数
    executor:执行器函数
     */
    function Promise(executor) {
        const self = this
        self.status = PENDING
        self.data = undefined
        self.callbacks = []

        function resolve(value) {
            if (self.status !== PENDING) {
                return
            }
            self.status = RESOLVED
            self.data = value

            if (self.callbacks.length > 0) {
                //模拟异步执行
                setTimeout(() => {
                    self.callbacks.forEach(callback => {
                        callback.onResolved(value)
                    })
                })
            }
        }
        /* 
      将promise的状态改为失败, 指定失败的reason
      */
        function reject(reason) {
            if (self.status !== PENDING) {
                return
            }
            self.status = REJECTED
            self.data = reason

            if (self.callbacks.length > 0) {
                setTimeout(() => {
                    self.callbacks.forEach(callback => {
                        callback.onRejected(reason)
                    })
                })
            }
        }

        /**
         * 异常处理
         */
        try {
            executor(resolve, reject)
        } catch (error) {
            console.error(error);
            reject(error)
        }

    }

    /* 
    用来指定成功/失败回调函数的方法
        1). 如果当前promise是resolved, 异步执行成功的回调函数onResolved
        2). 如果当前promise是rejected, 异步执行成功的回调函数onRejected
        3). 如果当前promise是pending, 保存回调函数
    返回一个新的promise对象
        它的结果状态由onResolved或者onRejected执行的结果决定
        2.1). 抛出error ==> 变为rejected, 结果值为error
        2.2). 返回值不是promise   ==> 变为resolved, 结果值为返回值
        2.3). 返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
    */

    Promise.prototype.then = function (onResolved, onRejected) {
        const self = this
        onResolved = typeof onResolved === 'function' ? onResolved : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason
        } // 将reason向下传递
        return new Promise((resolve, reject) => {
            /* 
        1. 调用指定的回调函数
        2. 根据回调执行结果来更新返回promise的状态
        */
            function handle(callback) {
                try {
                    const result = callback(self.data)
                    if (!(result instanceof Promise)) {
                        resolve(result)
                    } else {
                        result.then(
                            val => resolve(val),
                            reason => reject(reason)
                        )
                    }
                } catch (error) {
                    reject(error)
                }
            }
            if (self.status === RESOLVED) {
                setTimeout(() => {
                    handle(onResolved)
                })
            } else if (self.status === REJECTED) {
                setTimeout(() => {
                    handle(onRejected)
                })
            } else {
                self.callbacks.push({
                    onResolved(value) {
                        handle(onResolved)
                    },
                    onRejected(reason) {
                        handle(onRejected)
                    }
                })
            }

        })
    }

    Promise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected)
    }

    Promise.prototype.resolve = function (val) {
        return new Promise((resolve, reject) => {
            if (val instanceof Promise) {
                val.then(resolve, reject)
            } else {
                resolve(val)
            }
        })
    }

    Promise.prototype.reject = function (reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    Promise.all = function (promises) {
        return new Promise((resolve, reject) => {
            let rc = 0
            const values = new Array(promises.length)

            promises.forEach((p, idx) => {
                p.then(
                    val => {
                        rc++;
                        values[idx] = val
                        if (rc === promises.length) {
                            resolve(values)
                        }
                    },
                    reason => reject(reason)
                )
            })
        })
    }

    /* 
    返回一个promise, 由第一个完成promise决定
    */
    Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(p => {
                p.then(resolve, reject)
            })
        })
    }

    /* 
    返回一个延迟指定时间才成功(也可能失败)的promise
    */

    Promise.resolveDelay = function (val, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (val instanceof Promise) {
                    val.then(resolve, reject)
                } else {
                    resolve(val)
                }
            }, time)
        })
    }

    Promise.rejectDelay = function (val, time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(val)
            }, time)
        })
    }

    // 向外暴露Promise
    window.Promise = Promise
})(window)