<template>
  <div>
    <h2 class="create-title">创建新实验</h2>
    <el-form ref="form" :model="experiment" label-width="100px" class="create-form">
      <el-form-item label="输入实验名">
        <el-input v-model="experiment.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chooseFile">导入实验文件</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="openOtreeWebsites">还没有，创建一个</el-button>
      </el-form-item>
    </el-form>

    <input type="file" ref="fileInput" style="display: none" accept=".otree" @change="handleFileUpload">
    <el-dialog title="请选择otree文件" :visible.sync="dialogVisible">
      <el-button type="primary" @click="chooseFile">选择文件</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      experiment: {
        name: ''
      },
      dialogVisible: false
    };
  },
  methods: {
    chooseFile() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      // 处理文件上传逻辑
      console.log('上传的文件:', file);
      this.dialogVisible = false;
    },
    openOtreeWebsites() {
      window.open('https://www.otreehub.com/');
      setTimeout(() => {
        window.open('https://otree.readthedocs.io/en/latest/studio.html');
      }, 3000);
    }
  }
};
</script>

<style scoped>
.create-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.create-form {
  max-width: 400px;
}
</style>
