/* 
将数组拆分成多个 size 长度的区块，每个区块组成小数组,整体组成一个二维数组
*/
export function chunk(arr,size){
    if(!arr||arr.length === 0){
        return []
    }
    size = size |1
    const bigArr = []
    let smallArr = []

    arr.forEach(it =>{
        if(smallArr.length === 0){
            bigArr.push(smallArr);
        }
        smallArr.push(it)
        if(smallArr.length === size){
            smallArr = []
        }
    })

    return bigArr
}