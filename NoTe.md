项目笔记
===
搭建express简易服务器步骤
---
```js
npm init
npm i express -g
//或者
npm i express
//express本身已经全局安装了的话
```
再编辑app.js服务器文件，然后启动即可以直接访问根目录
```js
const express = require('express')

const app = new express();

app.listen(1996);

app.get("/",function(req,res){

    res.send("第一个本地服务器");
  
  });
```
在根节点下运行app.js，就可以开启服务器了
```js
node app.js
```