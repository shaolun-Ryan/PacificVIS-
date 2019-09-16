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

***
重构数据
---
* 如果按照原来的设想，以instance表为基准表：先检索usage表的每一条machine和time_stamp,拿着这两条数据去instance里面去找，如果instance里的时间跨度包含这个时间，就把usage的三个参数挂载intance表的后面。最后得到的表就是instance表加上machine状态。
  * 但是这种方法可行性不行，因为一条instance执行时，machine的状态不可能只有一种，所以不能这样重构数据
* 所以只有一种方法来处理数据，就是以usage为基准表，即显示每一个时刻所有machine在执行哪一条instance，只有这种方法是一一对应的。伤脑筋。。。

****
多个svg画布
---
在同一个组件中，可以添加多个svg画布，来渲染多个部分（如画1990~2013年的日历图，就可以直接添加那么多的svg画布）
```js
var svg = d3.select("body").selectAll("svg")
    .data(d3.range(1990, 2011))
  .enter().append("svg")
  ```
  把数据一个萝卜一个坑的种下去
  ****
d3-hexbin
---
这个d3包其实可以把任意数组转化为六边形
但是如果想让其整列画成蜂巢状，就得使用一个高斯分布函数
用高斯分布函数生成一个二维数组，然后将该数组放入hexbin()函数中，函数会按照正态分布的函数计算每个六边形的位置。
其实每一个六边形相当于一个区间，然后颜色深浅相当于该区间内数据的个数，
很像一个统计函数
```js
//生成高斯分布函数
var rx = d3.randomNormal(width / 2, 80),
    ry = d3.randomNormal(height / 2, 80),
    points = d3.range(n).map(function() { return [rx(), ry()]; });

    console.log(points);

var color = d3.scaleSequential(d3.interpolateLab("white", "steelblue"))
    .domain([0, 20]);

var hexbin = d3.hexbin()
    .radius(20)//六边形之间的间距
    .extent([[0, 0], [width, height]]);

console.log(hexbin(points));

let origin = hexbin(points)

let arr = [1,2,3,4,5,6,,7,8,9,10]

var hexagon = svg.selectAll("path")
  .data(hexbin(arr))
  .enter().append("path")
    .attr("d", hexbin.hexagon(19.5))//六边形的大小
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    // .attr("fill", function(d) { return color(d.length); });
```

***
js 排序
---
```js
const arr = [5,20,4,8,9,100,66,47,33,88]

const arr2 = [{
    x:1,
    y:11
},{
    x:3,
    y:33
},{
    x:2,
    y:22
},{
    x:4,
    y:44
}]

//下面的函数还可以用d3自带的d3.ascend()
function ttt(a,b){
    
       return  a.x - b.x

}


console.log(arr2.sort(ttt));

console.log()
```
***
js的遍历
---
```js
let arr = [1,5,8,4,6,8,2,5,7,4,56]

for(let i in arr){
    console.log(i);
}

arr.forEach((d,i)=>{
    console.log(i);
})
```
***
js的遍历修改
---
只有map方法可以，forEach只能遍历，不能修改
```js
let b = arr.map((d,i)=>{
    return d*2
    
})

let arr2 = [{
    x : 4
},{
    x : 2
},{
    x: 3
},{
    x: 1
}]

// for(let i in arsr){
//     arr[i] = 3
// }

let bb = arr2.map((d,i)=>{
    return 3
})
console.log(bb);
```
***
web-socket
---
websocket是一种双工流的传输协议，类似于http。
能实现实时跟新数据的方式有很多，比如http的ajax轮询、long polling
但是websocket和他们的区别在于ws可以双工的从服务器端开启更新，即有数据更新之后之前传给前台，应用场景有微信、qq等实时聊天软件
而ajax轮询是从客户端开启更新，每隔一段时间就发此一次请求。看看数据有没有更新
这里我们选用ajax轮询机制。
***
关于后台数据查询的问题
---
目前想到的解决方案是把数据转到前台，前台取到数据后做查询操作。