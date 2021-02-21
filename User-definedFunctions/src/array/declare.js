export function map(arr, callback) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i]))
    }
    return result;
}

export function reduce(arr, callback, defalut) {
    let result = defalut;
    for (let i = 0; i < arr.length; i++) {
        result = callback(result, arr[i], i);
    }
    return result;
}

export function filter(arr, callback) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i)) {
            result.push(arr[i]);
        }
    }
    return result;
}

export function find(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i)) {
            return arr[i];
        }
    }
    return arr[i];
}

export function index(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i)) {
            return i;
        }
    }
    return -1;
}

export function every(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        if (!callback(arr[i], i)) {
            return false;
        }
    }
    return true;
}

export function some(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i)) {
            return true;
        }
    }
    return false;
}

/*
方法3: 利用ES6语法
    1). from + Set
    2). ... + Set
    说明: 编码简洁
*/
export function unique(arr) {
    return [...new Set(arr)];
}

/* 
语法: var new_array = concat(old_array, value1[, value2[, ...[, valueN]]]) 
功能: 将n个数组或值与当前数组合并生成一个新数组
*/
export function concat(arr1, ...arr2) {
    const arr = [...arr1]
    arr2.forEach(v => {
        if (Array.isArray(v)) {
            arr.push(...v)
        } else {
            arr.push(v)
        }
    })
    return arr;
}

/* 
  语法: var new_array = slice(oldArr, [begin[, end]])
  功能: 返回一个由 begin 和 end 决定的原数组的浅拷贝, 原始数组不会被改变
*/
export function slice(arr, begin, end) {
    // 如果当前数组是[], 直接返回[]
    if (array.length === 0) {
        return []
    }
    // 如果begin超过最大下标, 直接返回[]
    begin = begin || 0;
    if (begin >= arr.length) {
        return []
    }
    // 如果end不大于begin, 直接返回[]
    end = end || arr.length;
    if (end > arr.length) {
        end = arr.length;
    }

    if (end <= begin) {
        return [];
    }

    // 取出下标在[begin, end)区间的元素, 并保存到最终的数组中
    const res = []

    for (let i = begin; i < end; i++) {
        res.push(arr[i]);
    }

    return res;
}

