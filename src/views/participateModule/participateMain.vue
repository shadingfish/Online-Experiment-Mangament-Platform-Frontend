<template>
   <div class="container">
  <div class="participate-main">
<<<<<<< HEAD
    <h1>我参与的实验</h1>
    <div class="space1"></div>
    <el-table :data="tableData" class="experiment-table">
      <el-table-column prop="id" label="实验ID"></el-table-column>
      <el-table-column prop="name" label="实验名称"></el-table-column>
      <el-table-column prop="createdDate" label="创建日期"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="experimentLink" label="实验链接"></el-table-column>
    </el-table>
<!--     <el-button @click="showDialog" class="dialog-button">手动参与实验</el-button>
    <el-dialog :visible.sync="dialogVisible" title="请输入实验ID" class="experiment-dialog">
      <el-input v-model="inputExperimentId" placeholder="请输入实验ID"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitExperiment">提交</el-button>
      </span>
    </el-dialog> -->
    <div class="space3"></div>
=======
    <h2>我参与的实验</h2>
    <el-table :data="experiments" class="experiment-table">
      <el-table-column prop="expId" label="实验ID"></el-table-column>
      <el-table-column prop="expName" label="实验名称"></el-table-column>
      <el-table-column prop="createTime" label="创建日期"></el-table-column>
      <el-table-column prop="url" label="实验链接"></el-table-column>
    </el-table>
>>>>>>> remotes/upstream/master
  </div>
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

.container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .container h1 {
    text-align: center;
    color: #378ee6;
  }

  .space1{
    height: 10px;
  }
  .space2{
    height: 8px;
  }
  .space3{
    height: 30px;
  }
</style>