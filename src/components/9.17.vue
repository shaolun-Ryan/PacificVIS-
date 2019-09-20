<template>
    <div>
        <h1>{{message}}</h1>
        <p>{{data}}</p>
    </div>
</template>

<script>
import * as d3 from 'd3';
import promisePoller from 'promise-poller'


export default {
    data(){
        return{
            message:'川普NMSL',
            data: null,
            a:0
        }
    },

    

    methods:{
        d3(d){
            console.log(JSON.parse(d));//JSON字符串转JSON对象
            
        },

        getData(){
            this.axios.get('/stream')
            .then(response =>{
                this.a += 1
                console.log(this.a);

                let data =  response.data.split('}{').join('},{')//有结果输出，说明在前台可以取到数据
                data = '['.concat(data).concat(']')//完成了数据的格式化，data是一个JSON数组

                this.d3(data)
                //开始轮询请求数据
                setTimeout(()=>{
                    this.getData()
                },1000000)//此处的时间就是每次间隔的时间，向后台发一次请求
            })
        }


    },

    mounted(){
        
        this.getData()
        
    }
}
</script>