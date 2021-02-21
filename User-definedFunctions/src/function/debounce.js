export function debounce(callback,time){

    let timeId =-1;
    return function(e){
        if(timeId!==-1)
        {
            clearTimeout(timeId);
        }
        //启动定时器
        timeId = setTimeout(()=>{
            callback.call(this,e)

            timeId = -1
        },time)
    }
}