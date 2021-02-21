import array from './array'
import axios from './axios'
import eventBind from './event-bind'
import eventBus from './event-bus'
import func from './function'
import object from './object'
import promise from './promise'
import PubSub from './pub-sub'
import string from './string'



export function test(){
    document.write('测试自定义包')
    console.log('test()');
}

export {
    array,
    axios,
    eventBus,
    eventBind,
    func,
    object,
    promise,
    PubSub,
    string
}