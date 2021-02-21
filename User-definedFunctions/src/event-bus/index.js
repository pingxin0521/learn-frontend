const eventBus = {}
/* 
{
  add:  [callback1, callback2]
  delete: [callback3]
}
*/
const callbacksObj = {}

/* 
绑定事件监听
*/
eventBus.on = function(eventName,callback){
    const callbacks = callbacksObj[eventName]
    if(callbacks){
        callbacks.push(callback)
    } else {
        callbacksObj[eventName] = [callback]
    }
}

/* 
分发事件
*/
eventBus.emit = function(eventName,data){
    const callbacks = callbacksObj[eventName]
    if(callbacks && callbacks.length >0){
        callbacks.forEach(cb =>{
            cb(data)
        })
    }
}

eventBus.off = function(eventName){
    if(eventName){
        delete callbacksObj[eventName]
    } else {
        callbacksObj = {}
    }
}

export default eventBus