<template>
    <div>
        <h1>{{message}}</h1>
        <p>{{data}}</p>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    data(){
        return{
            message:'川普NMSL',
            data: null
        }
    },

    methods:{
        d3(){

            d3.csv('../../static/data/9.17.csv',(err,data)=>{
                // console.log(data);
            })
        }
    },

    mounted(){
       this.axios
        .get('/stream')
        .then(response =>{
            this.data = response
        })
        .catch(err =>{
            console.log(err);
        })

        this.d3()
    }
}
</script>