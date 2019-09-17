Summary_1
===
********
* 近期工作进度：
  * 对提出的数据流形式的设想得到了一点小的进展（在第二点中解释）
  * 重新搭建服务器，我的设想是对整个项目的服务器和可视化页面重新设计并实现。
    * 原因一：服务器从原来的数据库模式更新成数据流动态渲染模式，数据库的存在反而有悖于这种思路
    * 原因二：由于是动态刷新，所以可视化组件也需要重新设计和实现
    * By the way：服务器的话我想现在先暂时不用Google Gloud，原因是：
      * 1)搭建需要耗费大量的时间和精力，并且国内对Google的网速有限制，相关的学习资料也偏少
      * 2)客户端的代码还是和现在的express比较契合，突然换的话兼容性不是很好，需要慢慢学习，大概网上查阅了一下资料感觉不是一两天就能搞懂的
      * 在去美国了之后可以专门研究一下这个东西，以后是一个好的方向，但是现在时间有限，先好好做Pvis
  * 新的项目在Github中有上传（半个小时后吧），需要查看的话可以看一下，但是现阶段只有后台服务器的一些code，在模拟数据阶段。

***
总结：流数据的实现对现在这种大数据文件结构的处理是一个好的方向，而且契合我们的Online的思路。之前是前一个工作chinaVis最头疼的地方，解决了的话还是挺好的。但是就要涉及可视组件的动态刷新问题。又是一个新的技术，需要慢慢钻研。

*有关数据流的视频一会发到微信里*