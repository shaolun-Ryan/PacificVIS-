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
        d3(){

            
        },

        getData(){
            this.axios.get('/stream')
            .then(response =>{
                this.a += 1
                console.log(this.a);

                //开始轮询请求数据
                setTimeout(()=>{
                    this.getData()
                },100)//此处的时间就是每次间隔的时间，向后台发一次请求
                // this.data =  response.data
            })
        }


    },

    mounted(){
        
        this.getData()
        
    }
}
</script>