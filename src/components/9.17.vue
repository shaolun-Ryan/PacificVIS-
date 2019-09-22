<template>
    <div>
        <!-- 定义按钮 -->
        <div>
            <el-button :title="btn1" @click="updateBack">Init Stream</el-button>
            <el-button :title="btn2" @click="pauseBack">Pause Stream</el-button>

        </div>
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
            a:0,
            btn1:'Click to update data steam in back server.',
            btn2:'Click to pause view updating.',
            stream_flag:true
        }
    },

    

    methods:{

        //刷新后台数据
        updateBack(){

            // alert(this.$store.state.t)//测试通过，可以访问vuex.state
            this.axios.get(`/stream?stream_flag=${this.stream_flag}`)

        },

        //暂停后台数据
        pauseBack(){

        },//通过操作flag标志位

        d3(data){
            
            //删除之前的画布，添加刷新的画布
            d3.select('svg')
            .remove();
            
            
            const width = 1500
            const height = 700
            const margin = {top: 10, right: 10, bottom: 50, left: 40}

            const svg = d3.select('body')
            .append('svg')
            .attr('class','background')
            .attr('width',width)
            .attr('height',height)

            svg.append("rect")
            .attr("class", "background")
            .attr("width", width-margin.left-margin.right)
            .attr("height", height-margin.top-margin.bottom)
            .attr('transform',`translate(${margin.left},${margin.right})`)

            let stack = d3.stack().keys(['num_hign','num_normal'])

            let dt = stack(data)

            let x = d3.scaleBand()
            .domain(data.map(d =>{return d.job_name}))
            .range([margin.left, width - margin.right])
            .padding(0.1)

            let y = d3.scalePow().exponent(0.5)
            .domain([0, d3.max(dt , d => d3.max(d, d0 => d0[1]))])/////
            .rangeRound([height - margin.bottom, margin.top])

            const color = d3.scaleOrdinal()
            .domain(dt.map(d => d.key))
            .range(['#4E001F','#D6747F'])

            const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0).tickSize(-(height-margin.top)))
            .call(g => g.selectAll(".domain").remove())

            svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll('text')
            .attr('transform','rotate(60)')
            .style("text-anchor", "start")
            .style('font-size',5)
            


            const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(20,'s').tickSize(-(width-margin.left)))
    // .call(g => g.selectAll(".domain").remove())

            svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(0," + margin.left + ")")
            .call(yAxis)

            svg.append("g")
            .selectAll("g")
            .data(dt)
            .enter()
            .append('g')
            .attr("fill", d => {
                return color(d.key)
            })
            .selectAll("rect")
            .data(d=>{
                return d
            })
            .enter()
            .append('rect')
            .attr("x", (d, i) => x(d.data.job_name))
            .attr("y", d => y(d[1]))
            .attr("height", d =>{
                return y(d[0]) - y(d[1])
            })
            .attr("width", x.bandwidth());

            

            svg.append('g')
            .attr('fill','#000')
            .selectAll('text')
            .data(dt[1])
            .enter()
            .append('text')
            .attr('x',d=>{
                return x(d.data.job_name)
            })
            .attr('y',d=>{
               return y(d[1])
            })
            // .attr("dy", "0.35em")
            .text(d=>{
           
                return ((d.data.num_hign/(d.data.num_hign+d.data.num_normal))*100).toFixed(2)+'%'
            })
            .attr('transform','rotate(0)')
            .style("text-anchor", "start")
            .style('font-size',2.5)
            .attr('dx','-0.5em')
        },

        //筛选处理，将hign个数小且占有率大的数据删去//比如：只有一个节点。且为高，但占有率为100%
        dropElement(d){
            let dt = JSON.parse(d);//JSON字符串转JSON对象

            let data = new Array()

            dt.forEach(d=>{
                if((d.num_hign > 500 && d.num_normal == 0) || d.num_normal != 0){
                    data.push(d)
                }
            })

            //将高负载率按从大到小顺序排序
            function ttt(a,b){
            return b.num_hign/b.num_normal - a.num_hign/a.num_normal
        }

            //排序函数
            data = data.sort(ttt)

            return data
        },

        getData(){
            this.axios.get(`/stream?stream_flag=${this.stream_flag}`)
            .then(response =>{
                this.a += 1
                console.log(this.a);

                let data =  response.data.split('}{').join('},{')//有结果输出，说明在前台可以取到数据
                data = '['.concat(data).concat(']')//完成了数据的格式化，data是一个JSON数组

                data = this.dropElement(data)

                this.d3(data)

                //开始轮询请求数据
                setTimeout(()=>{
                    this.getData()
                },5000)//此处的时间就是每次间隔的时间，向后台发一次请求
                //慢一点可以渲染完全
            })
        }


    },

    mounted(){
        

        // if(stream_flag)
        this.getData()

             
    }
}
</script>

<style>

.background {
  fill: #e7e7e7;

}

.axis line {
  fill: none;
  stroke: #fff;
  shape-rendering: crispEdges;
}

</style>