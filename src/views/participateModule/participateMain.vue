<template>
   <div class="container">
  <div class="participate-main">
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
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: "实验1", createdDate: "2023-06-15", status: "已参与", experimentLink: "http://example.com/experiment1" },
        { id: 2, name: "实验2", createdDate: "2023-06-16", status: "待参与", experimentLink: "http://example.com/experiment2" },
        { id: 3, name: "实验3", createdDate: "2023-06-17", status: "未开始", experimentLink: "http://example.com/experiment3" }
      ],
      dialogVisible: false,
      inputExperimentId: ""
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    submitExperiment() {
      // 在这里添加提交实验的逻辑
      console.log("提交实验ID:", this.inputExperimentId);
      this.dialogVisible = false;
    }
  }
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