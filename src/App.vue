<template>
  <div>
    <el-container>
      <el-header><font size='5'><i class="el-icon-pie-chart"></i> JobPlot</font></el-header>
      <el-main>
        <b1/>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import b1 from './components/9.17.vue'

export default {
  name: 'App',
  components: {
    b1
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    font-weight: 500;
    font-family: Verdana, Geneva, Tahoma, sans-serif
  }
  

  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 45px;
    border-radius:5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
