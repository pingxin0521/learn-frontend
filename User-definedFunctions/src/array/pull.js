/* 
1. pull(array, ...values): 
  删除数组中与value相同的元素, 返回所有删除元素的数组
  说明: 数组发生了改变
  如: pull([1,3,5,3,7], 2, 7, 3, 7) ===> 数组变为[1, 5], 返回值为[3,3,7]
2. pullAll(array, values): 
  功能与pull一致, 只是参数变为数组
  如: pullAll([1,3,5,3,7], [2, 7, 3, 7]) ===> 数组变为[1, 5], 返回值为[3,3,7]
*/

export function pull(arr, ...vals) {
    if (arr.length === 0 || vals.length === 0) {
        return []
    }

    let result = []
    for (let i = 0; i < arr.length; i++) {
        const it = arr[i]
        if (vals.indexOf(it) !== -1) {
            arr.splice(i, 1)
            result.push(i)
            i--
        }
    }
    return result
}

export function pullAll(array, values) {
    if (!values || !Array.isArray(values)) {
        return []
    }
    return pull(array, ...values)
}