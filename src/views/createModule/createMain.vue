<template>
    <div class="create-container">
      <h2 class="create-title">我创建的实验</h2>
      <el-table :data="experiments" border class="experiment-table">
        <el-table-column prop="id" label="实验ID"></el-table-column>
        <el-table-column prop="name" label="实验名称"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column label="管理实验">
          <template slot-scope="scope">
            <el-button type="text" @click="manageExperiment(scope.row)">管理实验</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="create-experiment-btn" type="primary" @click="goToCreateExperiment">创建实验</el-button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        experiments: [
          { id: 1, name: '实验1', createdAt: '2023-06-18' },
          { id: 2, name: '实验2', createdAt: '2023-06-19' },
          { id: 3, name: '实验3', createdAt: '2023-06-20' }
        ]
      };
    },
    methods: {
      manageExperiment(experiment) {
        // 导航到 manage.vue，并传递实验ID
        this.$router.push({ name: 'manage', params: { id: experiment.id } });
      },
      goToCreateExperiment() {
        // 导航到 createExp.vue
        this.$router.push('/experiment/createModule/createExp');
      }
    }
  };
  </script>
  
  <style scoped>
  .create-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .create-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .experiment-table {
    margin-bottom: 20px;
  }
  
  .create-experiment-btn {
    margin-left: 10px;
  }
  </style>
  