//在这个处理函数中，在回调函数中声明的变量（最终的结果数组job_arr等等），在外部都获取不到，不知道什么原因
//暂时推荐写在控制流中的函数，可以识别并且获取到

const fs = require('fs')

const through2 = require('through2')

const csv = require('fast-csv')

module.exports = (req,res) => {


const events = require('events')

let myEmitter = new events.EventEmitter()

myEmitter.on('some',()=>{

    rs.pipe(csv.parse({headers:true})).pipe(skip).pipe(res)

})


const rs = fs.createReadStream('./app/sampleTree_690000.csv')


    //监听读取的打开
rs.on('open',()=>{
    console.log('开始读取');
    // console.log(store.state.t);//不得行，nodejs暂时不会如何获取vuex
})


//开始处理


let i = 0
    job_arr_exist = new Array()
    job_arr = new Array()
    counter = -1//job_arr的计数器


let skip = through2({objectMode:true},function (chunk, encoding, callback) {

    // if(chunk.job_name == 'j_926983'){
    //     i+=1

    // let a = {
    //     ed: chunk.inst_name
    // }
    // this.push(`${JSON.stringify(a)},`)
    // }



    if(job_arr_exist.indexOf(chunk.job_name) == -1){

        if(job_arr.length != 0){
            this.push(`${JSON.stringify(job_arr[counter])}`)
        }

        job_arr_exist.push(chunk.job_name)
        let a = new Object()
        a.job_name = chunk.job_name
        //设置高负载的阈值为90%
        if(chunk.cpu_avg > 90){
            a.num_hign = 1
            a.num_normal = 0
        }else{
            a.num_hign = 0
            a.num_normal = 1
        }
        job_arr.push(a)

        counter++
    }else{
        if(chunk.cpu_avg > 90){
            //默认不用查找job，默认相同job都是连在一起的
            job_arr[counter].num_hign++
        }else{
            job_arr[counter].num_normal++
        }
    }

    callback()

  })


if(req.query.stream_flag == 'true'){
    myEmitter.emit('some',req.query.stream_flag)
}

rs.on('data',data=>{
    // console.log('正在读取')
    // rs.pause()

    // setInterval(()=>{S
    //     rs.resume()
    // },5000)


})



// res.send('123')


rs.on('end',()=>{
    console.log('读取结束');
    // console.log(i);
})

}