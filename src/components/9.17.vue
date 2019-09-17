<template>
    <div>
        <h1>{{message}}</h1>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    data(){
        return{
            message:'川普NMSL'
        }
    },

    methods:{
        d3(){
            d3.range(20).map((d)=>{
                console.log(d);
            })

            d3.csv('../../static/data/9.17.csv',(err,data)=>{
                console.log(data[0].index);
            })
        }
    },

    mounted(){
            this.d3()
    }
}
</script>