/**
 * 语法：addEventListener(element, type, fn, selector)
说明：如果selector没有，直接给element绑定事件，
  如果selector有，将selector对应的多个元素的事件委托绑定给父元素element
 * @param {HtmlElement} ele 
 * @param {*} type 
 * @param {*} fn 
 * @param {*} selector 
 */
function addEventListener(ele,type,fn,selector){
    if(!selector){
        ele.addEventListener(type,fn)
    } else {
        ele.addEventListener(type,function(event){
            const target = event.target;
            if(target.matches(selector)){
                fn.call(target,event)
            }
        })

    }
}

export default {addEventListener }