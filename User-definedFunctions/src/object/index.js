function newInstance(Fn, ...args) {
    // 创建一个空的object实例对象obj, 作为Fn的实例对象
    const obj = {}
    // 将Fn的prototype属性值赋值给obj的__proto__属性值
    obj.__proto__ = Fn.prototype
    // 调用Fn, 指定this为obj, 参数为args列表
    const result = Fn.call(obj, ...args)
    // 如果Fn返回的是一个对象类型, 那返回的就不再是obj, 而是Fn返回的对象
    // 否则返回obj
    return result instanceof Object ? result : obj
}

function myInstanceOf(obj, Type) {
    // 得到原型对象
    let protoObj = obj.__proto__

    // 只要原型对象存在
    while (protoObj) {
        // 如果原型对象是Type的原型对象, 返回true
        if (protoObj === Type.prototype) {
            return true
        }

        // 指定原型对象的原型对象
        protoObj = protoObj.__proto__
    }

    return false

}

function mergeObject(...objs) {
    const result = {}

    // 遍历objs
    objs.forEach(obj => {
        Object.keys(obj).forEach(key => {
            // 如果result还没有key值属性
            if (!result.hasOwnProperty(key)) {
                result[key] = obj[key]
            } else {
                result[key] = [].concat(result[key], obj[key])
            }
        })
    });

    return result;
}

/* 方法一: 利用ES6语法*/
function clone1(target) {
    // 如果是对象(不是函数, 也就是可能是object对象或者数组)
    if (target != null && typeof target === 'object') {
        if (target instanceof Array) {
            //  return target.slice()
            //  return target.fliter(()=>true)
            //  return target.map((it)=>it)
            return [...target]
        } else {
            return { ...target }
        }
    }

    return target
}

/* 方法二: 利用ES5语法: for...in */
function clone2(target) {
    if (target != null && typeof target === 'object') {
        const cloneTarget = Array.isArray(target) ? [] : {}
        for (let k in target) {
            if (target.hasOwnProperty(k)) {
                cloneTarget[k] = target[k]
            }
        }
        return cloneTarget
    } else {
        return target
    }
}


/* 
深度克隆
1). 大众乞丐版
    问题1: 函数属性会丢失
    问题2: 循环引用会出错
2). 面试基础版本
    解决问题1: 函数属性还没丢失
3). 面试加强版本
    解决问题2: 循环引用正常
4). 面试加强版本2(优化遍历性能)
    数组: while | for | forEach() 优于 for-in | keys()&forEach() 
    对象: for-in 与 keys()&forEach() 差不多
*/

/* 
1). 大众乞丐版
    问题1: 函数属性会丢失
    问题2: 循环引用会出错
*/
function deepClone1(target) {
    return JSON.parse(JSON.stringify(target))
}


/* 
2). 面试基础版本
    解决问题1: 函数属性还没丢失
*/
function deepClone2(target) {
    if (target !== null && typeof target === 'object') {
        const ct = target instanceof Array ? [] : {}
        for (let k in target) {
            if (target.hasOwnProperty(k)) {
                ct[k] = deepClone2(target[k])
            }
        }
        return ct
    }
    return target
}

/* 
3). 面试加强版本
    解决问题2: 循环引用正常
*/

function deepClone3(target, map = new Map()) {
    if (target !== null && typeof target === 'object') {
        // 从缓存容器中读取克隆对象
        let cloneTarget = map.get(target)
        // 如果存在, 返回前面缓存的克隆对象
        if (cloneTarget) {
            return cloneTarget
        }
        // 创建克隆对象(可能是{}或者[])  
        cloneTarget = target instanceof Array ? [] : {}
        // 缓存到map中
        map.set(target, cloneTarget)
        for (const key in target) {
            if (target.hasOwnProperty(key)) {
                // 递归调用, 深度克隆对象, 且传入缓存容器map
                cloneTarget[key] = deepClone3(target[key], map)
            }
        }

        return cloneTarget
    }

    return target

}

/* 
4). 面试加强版本2(优化遍历性能)
    数组: while | for | forEach() 优于 for-in | keys()&forEach() 
    对象: for-in 与 keys()&forEach() 差不多
*/

function deepClone4(target, map = new Map()) {
    if (target !== null && typeof target === 'object') {
        // 从缓存容器中读取克隆对象
        let ct = map.get(target)
        // 如果存在, 返回前面缓存的克隆对象
        if (ct) {
            return ct
        }
        // 创建克隆对象(可能是{}或者[])  
        if (target instanceof Array) {
            ct = []
            map.set(target, ct)
            target.forEach((it, idx) => {
                ct[idx] = deepClone4(it, map)
            })
        } else {
            ct = {}
            map.set(target, ct)
            Object.keys(target).forEach(k => {
                ct[k] = deepClone4(target[k], map)
            })
        }
        return ct;
    }
    return target
}

export default {
 newInstance,
 myInstanceOf,
 mergeObject,
 clone1,
 clone2,
 deepClone1,
 deepClone2,
 deepClone3,
 deepClone4
}