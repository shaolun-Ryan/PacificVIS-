项目笔记
===
搭建express简易服务器步骤
---
```shell
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

****

第一次上传代码到Github建议步骤
---
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

**********
console.log()性能消耗
---
console.log是一个很消耗cpu处理性能的指令。
目测如果没有每一条记录都要console.log的话，CPU读取性能将要快三倍以上
*********

d3数据文件源
---
* 用数据文件 + http-server服务器渲染视图：
  * 如果改变数据文件的内容，你会发现改变内容甚至删去数据文件，视图还是可以刷新出来，重启浏览器或者服务器都一样，好像见了鬼一样。
  猜想：可能是在第一次渲染的时候，服务器就把数据源储存在了缓存或者storage中。（后期有待验证）
* 用服务器res作为数据源渲染数据：
  * 在chinaVis项目中，force-directed-Treemap视图里，在后台返回的数据也是根据点击事件触发响应变化的，所以猜想加入vue框架的话说不定可以解决。