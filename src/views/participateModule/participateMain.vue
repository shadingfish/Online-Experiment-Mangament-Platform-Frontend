<template>
  <div class="participate-main">
    <h2>我参与的实验</h2>
    <el-table :data="experiments" class="experiment-table">
      <el-table-column prop="expId" label="实验ID"></el-table-column>
      <el-table-column prop="expName" label="实验名称"></el-table-column>
      <el-table-column prop="createTime" label="创建日期"></el-table-column>
      <el-table-column prop="url" label="实验链接"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getJoinedExpList } from '@/api/Exp';
export default {
  data() {
    return {
      experiments: [], // 添加 experiments 属性，并初始化为空数组
      // expId: '',
      // expName: '',
      // create_time: '',
      // url: '',
    };
  },
  mounted(){
      getJoinedExpList().then((_)=>{
        this.experiments=_.data
        console.log(_.data)
      })
    },
};
</script>
<style scoped>
.participate-main {
  padding: 20px;
}

.experiment-table {
  margin-top: 20px;
}

.dialog-button {
  margin-top: 20px;
}

.experiment-dialog {
  text-align: center;
}
</style>