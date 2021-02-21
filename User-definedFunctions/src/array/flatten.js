/* 
数组扁平化: 取出嵌套数组(多维)中的所有元素放到一个新数组(一维)中
  如: [1, [3, [2, 4]]]  ==>  [1, 3, 2, 4]
*/

/*
方法一: 递归 + reduce() + concat()
*/
export function flatten1 (array) {
    return array.reduce((pre, item) => {
      if (Array.isArray(item) && item.some(cItem => Array.isArray(cItem))) {
        return pre.concat(flatten1(item))
      } else {
        return pre.concat(item)
      }
    }, [])
  }

/*
方法二: ... + some() + concat()
*/
export function flatten(array){
    let result = [].concat(...array);
    while(result.some(it=>Array.isArray(it)))
    {
        result = [].concat(...result);
    }
    return result;
}