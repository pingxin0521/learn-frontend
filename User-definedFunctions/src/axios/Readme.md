### 手写ajax请求函数

- 语法：
  - axios(options)
    - 参数配置对象：url, method, params与data
    - 返回值为：promise对象
  - axios.get(url, options)
  - axios.post(url, data, options)
  - axios.put(url, data, options)
  - axios.delete(url, options)
- 功能：使用xhr发送ajax请求的工具函数，与axios库功能类似

**实现整体流程**

1. 函数的参数为一个配置对象

   { url: '', // 请求地址 method: '', // 请求方式GET/POST/PUT/DELETE params: {}, // GET/DELETE请求的query参数 data: {}, // POST或DELETE请求的请求体参数 }

2. 返回值: 函数的返回值为promise, 成功的结果为response, 失败的结果为error

3. 能处理多种类型的请求: GET/POST/PUT/DELETE

4. 响应json数据自动解析为js的对象/数组