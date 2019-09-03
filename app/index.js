


module.exports = app =>{
    app.get("/",(req,res)=>{

        res.send("第一个本地服务器");
      
      });

    //测试流数据

    app.get('/stream',require('./stream'));
}