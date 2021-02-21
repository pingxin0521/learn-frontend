//1.声明构造方法
function Axios(config) {
    //init
    this.default = config
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager(),
    }
}

Axios.prototype.get = function (config) {
    return this.request({
        method: 'GET'
    })
}

Axios.prototype.post = function (config) {
    return this.request({
        method: 'POST'
    })
}

function createInstance(config) {
    let context = new Axios(config)
    const instance = Axios.prototype.request.bind(context)
    Object.keys(Axios.prototype).forEach(key => {
        instance[key] = Axios.prototype[key].bind(context)
    })
    Object.keys(context).forEach(k => {
        instance[k] = context[k]
    })
    console.dir(instance);
    return instance
}

// 2.dispatchRequest
function dispatchRequest(config) {
    console.log('dispatchRequest');
    throwIfCancellationRequested(config);
    return xhrAdapter(config).then(response => {
        throwIfCancellationRequested(config);
        return response
    }, error => {
        throwIfCancellationRequested(config);
        throw error;
    })
}

//3.xhrAdapter 适配器
function xhrAdapter(config) {
    console.log('xhrAdapter');
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(config.method, config.url);
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState !== 4) {
                return
            }
            if (request.status >= 200 && request.status < 300) {
                resolve({
                    config: config,
                    data: request.response,
                    headers: request.getAllResponseHeaders(),
                    request: request,
                    status: request.status,
                    statusText: request.statusText,
                });
            } else {
                reject(new Error('error:' + request.status));
            }
        }
        if (config.cancelToken) {
            config.cancelToken.promise.then(cancel => {
                if (!request) {
                    return;
                }
                // 中断请求
                request.abort();
                // 让请求的promise失败
                reject(cancel);
                // Clean up request
                request = null;
            })
        }
    })
}

//4.拦截器
function InterceptorManager() {
    this.handlers = []
}
InterceptorManager.prototype.use = function (fulfilled, rejected) {
    this.handlers.push({
        fulfilled,
        rejected,
    })
}
InterceptorManager.prototype.forEach = function forEach(fn) {
    // 遍历处理所有保存的拦截器
    this.handlers.forEach(h => {
        if (h !== null) {
            fn(h);
        }
    });
};
//原型上的方法
Axios.prototype.request = function (config) {
    console.log('发送axios请求', config);
    let promise = Promise.resolve(config);
    let chain = [dispatchRequest, undefined] //占位
    // 后添加的请求拦截器保存在数组的前面
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    // 后添加的响应拦截器保存在数组的后面
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
    });
    // 通过promise的then()串连起所有的请求拦截器/请求方法/响应拦截器
    while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
    }
    return promise
}

//5. 取消
function Cancel(message) {
    this.message = message;
}

Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
};

// 用于标识是一个取消的error
Cancel.prototype.__CANCEL__ = true;

function CancelToken(executor) {
    if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
    }
    let resolvePromise;
    this.promise = new Promise((resolve) => {
        resolvePromise = resolve
    })
    // 保存当前token对象
    var token = this;

    executor(function cancel(message) {
        // 如果token中有reason了, 说明请求已取消
        if (token.reason) {
            // Cancellation has already been requested
            return;
        }
        // 将token的reason指定为一个Cancel对象
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    })
}
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
        throw this.reason;
    }
};

function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
}

function isCancel(value) {
    return !!(value && value.__CANCEL__);
};

//6.创建axios
let axios = createInstance({
    method: 'GET'
})

// axios({method: 'GET'});
// axios.get();
// axios.post();
// 添加请求拦截器(回调函数)
axios.interceptors.request.use(
    config => {
        console.log('request interceptor1 onResolved()')
        return config
    },
    error => {
        console.log('request interceptor1 onRejected()')
        return Promise.reject(error);
    }
)
axios.interceptors.request.use(
    config => {
        console.log('request interceptor2 onResolved()')
        return config
    },
    error => {
        console.log('request interceptor2 onRejected()')
        return Promise.reject(error);
    }
)
// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        console.log('response interceptor1 onResolved()')
        return response
    },
    function (error) {
        console.log('response interceptor1 onRejected()')
        return Promise.reject(error);
    }
)
axios.interceptors.response.use(
    response => {
        console.log('response interceptor2 onResolved()')
        return response
    },
    function (error) {
        console.log('response interceptor2 onRejected()')
        return Promise.reject(error);
    }
)