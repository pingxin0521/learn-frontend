export function throttle(callback,wait=100){
    //定义开始时间
    let start = 0;
    return function(e){
        let now = Date.now();
        if(now-start>=wait){
            //执行回调
            callback.call(this,e)
            start = now
        }
    }
}