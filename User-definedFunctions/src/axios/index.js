/**
 * 
 * @param {} param0 
 */
function axios({
    url,
    method = 'GET',
    params = {},
    data = {}
}) {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase()

        let queryString = ''

        Object.keys(params).forEach(k => {
            queryString += `${k}=${params[k]}&`
        })
        if (queryString) {
            queryString = queryString.substring(0, queryString.length - 1)
            url += '?' + queryString
        }

        const request = new XMLHttpRequest();

        request.open(method, url, true)
        if (method === 'GET') {
            request.send()
        } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
            // 告诉服务器请求体的格式是json
            request.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
            // 发送json格式请求体参数
            request.send(JSON.stringify(data))
        }
        request.responseType = 'json'
        request.onreadystatechange = function () {
            if (request.readyState !== 4) {
                return
            }
            const {
                status,
                statusText
            } = request

            if (status >= 200 && status < 300) {
                const response = {
                    data: request.response,
                    status,
                    statusText,
                }
                resolve(response)
            } else {
                reject(new Error('request error'))
            }
        }

    })
}

axios.get = function(url, options){
    return axios(Object.assign(options, {url, method: 'GET'}))
}

axios.delete = function(url, options){
    return axios(Object.assign(options, {url, method: 'DELETE'}))
}

axios.post = function(url, options){
    return axios(Object.assign(options, {url, method: 'POST'}))
}

axios.put = function(url, options){
    return axios(Object.assign(options, {url, method: 'PUT'}))
}

export default axios