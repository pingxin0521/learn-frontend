## Axios 

**前置知识**

- HTTP
- js
- node环境

### Restful 服务部署

[json server](https://github.com/typicode/json-server)

Install JSON Server

```
npm install -g json-server
```

Create a `db.json` file with some data

```
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

Start JSON Server

```
json-server -d 2000 --watch .\learn-axios\http-ajax-axios\db.json
```

Now if you go to http://localhost:3000/posts/1, you'll get

```
{ "id": 1, "title": "json-server", "author": "typicode" }
```

### 参考
1. https://segmentfault.com/a/1190000021321303
2. https://juejin.im/post/5b0ba2d56fb9a00a1357a334
3. [@叫我小明呀：Axios 源码解析](https://juejin.im/post/5cb5d9bde51d456e62545abc)
4. [@尼库尼库桑：深入浅出 axios 源码](https://zhuanlan.zhihu.com/p/37962469)
5. [@小贼先生_ronffy：Axios源码深度剖析 - AJAX新王者](https://juejin.im/post/5b0ba2d56fb9a00a1357a334)
6. [逐行解析Axios源码](https://juejin.im/post/5d501512518825159e3d7be6)
7. [[译\]axios 是如何封装 HTTP 请求的](https://juejin.im/post/5d906269f265da5ba7451b02)
8. [知乎@Lee : TypeScript 重构 Axios 经验分享](https://zhuanlan.zhihu.com/p/50859466)

## 对比其他请求库

### KoAjax

FCC成都社区负责人水歌开源的[KoAJAX](https://github.com/EasyWebApp/KoAJAX)。

[如何用开源软件办一场技术大会？](https://mp.weixin.qq.com/s/hxCwiokl4uPXJscTQi42-A)以下这篇文章中摘抄的一段。

> 前端请求库 —— KoAJAX 国内前端同学最常用的 HTTP 请求库应该是 axios 了吧？虽然它的 Interceptor（拦截器）API 是 .use()，但和 Node.js 的 Express、Koa 等框架的中间件模式完全不同，相比 jQuery .ajaxPrefilter()、dataFilter() 并没什么实质改进；上传、下载进度比 jQuery.Deferred() 还简陋，只是两个专门的回调选项。所以，它还是要对特定的需求记忆特定的 API，不够简洁。
>
> 幸运的是，水歌在研究如何[用 ES 2018 异步迭代器实现一个类 Koa 中间件引擎](https://tech-query.me/onion-stack/)的过程中，做出了一个更有实际价值的上层应用 —— KoAJAX。它的整个执行过程基于 Koa 式的中间件，而且它自己就是一个中间件调用栈。除了 RESTful API 常用的 .get()、.post()、.put()、.delete() 等快捷方法外，开发者就只需记住 .use() 和 next()，其它都是 ES 标准语法和 TS 类型推导。

### umi-request 阿里开源的请求库

[umi-request github 仓库](https://github.com/umijs/umi-request/blob/master/README_zh-CN.md)

`umi-request`与`fetch`,`axios`异同。
![codeumi-request/code 与 codefetch/code, codeaxios/code 异同](https://s3.ax1x.com/2021/02/21/yTiHdU.png)

不得不说，`umi-request`确实强大，有兴趣的读者可以阅读下其源码。

看懂`axios`的基础上，看懂`umi-request`源码应该不难。

比如`umi-request`取消模块代码几乎与`axios`一模一样。