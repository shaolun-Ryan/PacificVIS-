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

第一次上传代码到Github建议步骤
* 先在Github上建一个repository
* 用本地的Git开始操作
```shell
$ git init
$ git add .
$ git commit -m '后台开始搭建'
$ git remote add origin git@github.com:shaolun-Ryan/PacificVIS.git
$ $ git push -u origin master

```
* 完成
* *没有SSH秘钥的过程，如果是计算机第一次建库，还要绑定一下计算机的密匙*