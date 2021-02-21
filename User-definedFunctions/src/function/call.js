/**
 * obj 的this 执行方法Fn
 * @param {*} Fn 
 * @param {*} obj 
 * @param  {...any} args 
 * @returns
 */
export function call(Fn, obj, ...args) {
    if (obj === undefined || obj === null) {
        obj = globalThis;
    }
    // 为obj暂时添加方法
    obj.tempFn = Fn;
    //调用方法
    let result = obj.tempFn(...args);
    //移除方法
    delete obj.tempFn;
    return result;
}