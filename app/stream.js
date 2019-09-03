const fs = require('fs')

module.exports = (req,res) => {
    // res.send("测试流数据");//滚jB蛋吧坑货


    const stream = fs.createReadStream('./app/data.txt',{
        highWaterMark:150
    })

    console.log('now we are listening 3000 port');

    stream.on('open',()=>{
        console.log('file is open');
    })


    let counter = 0

    // rs.pipe(csv.parse({
    //     // objectMode:false,//对象模式，如果设置成false的话就不会输出成对象的结构了
    //     headers:true}))
    stream.on('data',(chunk)=>{
        console.log('yes');
        console.log(counter)
        // console.log(chunk.length);
        // console.log(chunk.toString());
        // console.log(chunk);

        stream.pause()

        setTimeout(()=>{
            stream.resume()
            console.log('数据重新开始流动');
        },1000)

        counter++;
    })

    stream.on('error',(err)=>{
        console.log(err);
    })

    stream.on('end',()=>{
        console.log('file read is end');
    })


    stream.pipe(res)

    

}