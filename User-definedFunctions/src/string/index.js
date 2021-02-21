/**
 * 1. 字符串倒序: reverseString(str)  生成一个倒序的字符串
 * @param {string} str 
 */
function reverseString(str) {
    return Array.from(str).reverse().join('')
}

/**
 * 2. 字符串是否是回文: palindrome(str) 如果给定的字符串是回文，则返回 true ；否则返回 false
 * @param {string} str 
 */
function palindrome(str) {
    return str === reverseString(str)
}

/**
3. 截取字符串: truncate(str, num) 如果字符串的长度超过了num, 截取前面num长度部分, 并以...结束
 * @param {string} str 
 */
function truncate(str, num) {
    return str.length > num ? str.slice(0, null) + '...' : str
}

export default {
    reverseString,
    palindrome,
    truncate,
}