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
或者将读到的数据生成一个静态文件，然后发送ajax请求来查找

***
安装webpack和webpack-dev-server
---
* 分别运行两个安装(全局和本地)
```npm i webpack -g```
```npm i webpack-dev-server -g```
```npm i webpack-cli -g -S```
```npm i webpack -D```
```npm i webpack-dev-server -D```
```npm i webpack-cli -D -S```
```npm i nodemon -D```

* 配置wenpack的配置文件
    * 在项目根目录新建wenpack.config.js
    * 配置路径

```js
//配置文件，js文件，向外暴露了一个配置对象
module.exports = {
    entry: path.join(__dirname,'./src/main.js'),
    output: {
        //输出文件的配置
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js'
    }
}
```

* 配置webpack-dev-server
    * 配置热更新命令
        * 进入package.json文件
        * 找到scripts，里面是一些启动命令
        * 加入
```shell
 "dev": "webpack-dev-server --open --port 8079 --hot --inline --progress --config build/webpack.dev.conf.js",

"start": "nodemon ./server/app.js",
```

到这里基本上就配置好了，以后启动只需要：
前台：```npm run dev```
后台：```npm run start```
***
搭建vue组件
---
* 安装vue-cli
    * 全局安装webpack ```npm i webpack -g```
    * webpack和webpack-dev-server的版本问题很重要
    * 本次项目的两个版本分别是：
    ```json
    "webpack": "^3.6.0",
    "webpack-dev-server": "^2.9.1"
    ```
    *一个方法：对一些npm package报错的时候，可以直接删了node_modules的文件夹，再npm install安装一遍，有些问题会迎刃而解.(所以package.json文件很重要)*

* 安装vue-cli
```npm install --global vue-cli```
测试:```vue -V```

* 开始构建项目
```vue init webpack PROJECTNAME```
之后就在你current folder里生成了一个vue项目的标准文件夹 PROJECTNAME

* 安装依赖
```npm install```
***
同步异步、单线程多线程的理解
---
* 同步就好比，餐厅的服务员，必须要服务完A桌才服务B桌，就是连给B拿菜单这样一个小小的动作都不可以。即所有程序的执行，严格遵守ABCD的顺序，不能插队。
异步，即可以插队，将花销大量时间的IO操作，不再等候，处理器去进行别的任务。

* 单线程即表示，有一个服务员
多线程即有多个服务员
***
Promise()的使用
---
Promise（）就是处理nodejs（异步高并发）的异步请求，而且异步请求包含很多的回调函数。所以理论上可以吧任意的异步的回调函数写成promise的形式。
* 把回调
```js
readdir:function(path){
    return new Promise(resolve=>{
        fs.readdir(path,(err,files)=>{
            if(err){
                throw err
            }
        resolve(files)
        })
    })
}

fs.readdir('../README.md')
    .then(content=>{
        console.log(content)
    })
```
上面代码里then回调函数的参数content就是封装的promise函数里resolve()传的值files

* 使用方法like this：
```js
new Promise(function (resolve, reject) {
    log('start new Promise...');
    var timeOut = Math.random() * 2;
    log('set timeout to: ' + timeOut + ' seconds.');
    setTimeout(function () {
        if (timeOut < 1) {
            log('call resolve()...');
            resolve('200 OK');
        }
        else {
            log('call reject()...');
            reject('timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
}).then(function (r) {
    log('Done: ' + r);
}).catch(function (reason) {
    log('Failed: ' + reason);
});
```
***
Vue解决跨域CORS问题
---
建议安装http-proxy-middleware组件
```npm install http-proxy-middleware -S```
安装之后，有两种方法启用http-proxy-middleware
* 在webpack.dev.conf.js中的devServer中加入：
```js
proxy:{
      '/stream':{target:'http://localhost:1996',changeOrigin:true}
    },
```

* 或者在app.js中加入
```js
const proxy = require('http-proxy-middleware')

app.use(
    proxy('/stream', {target: 'http://localhost:1996'})
  );
```