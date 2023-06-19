<template>
  <div class="manage-container">
    <h2>管理实验</h2>
    <div class="button-group">
      <el-button type="primary" class="manage-button">一键分发</el-button>
      <el-button type="primary" class="manage-button" @click="startExperiment">开始实验</el-button>
      <el-button type="primary" class="manage-button" @click="openNotificationDialog">群发通知</el-button>
      <el-button type="primary" class="manage-button" @click="openAddParticipantDialog">新增被试</el-button>
      <el-button type="primary" class="manage-button" @click="openImportParticipantsDialog">导入被试</el-button>
      <el-button type="primary" class="manage-button" @click="openAddObserverDialog">添加观察者</el-button>
      <el-button type="danger" class="manage-button" @click="openDeleteExperimentConfirmation">删除实验</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" class="experiment-dialog">
      <template v-if="dialogType === 'startExperiment'">
        <span v-if="experimentLink">
          实验链接: <a :href="experimentLink" target="_blank">{{ experimentLink }}</a>
        </span>
        <span v-else>实验正在启动中，请稍后...</span>
      </template>
      <template v-if="dialogType === 'notification'">
        <label for="notification-text">请填写群发信息:</label>
        <textarea id="notification-text" v-model="notificationText"></textarea>
      </template>
      <template v-if="dialogType === 'addParticipant'">
        <label for="participant-id">请填写新增被试ID:</label>
        <input type="text" id="participant-id" v-model="newParticipantId" />
      </template>
      <template v-if="dialogType === 'importParticipants'">
        <label for="participant-file">选择要导入的文件:</label>
        <input type="file" id="participant-file" ref="participantFile" @change="handleParticipantFileChange" />
      </template>
      <template v-if="dialogType === 'addObserver'">
        <label for="observer-id">请填写新增观察者ID:</label>
        <input type="text" id="observer-id" v-model="newObserverId" />
      </template>
      <template v-if="dialogType === 'deleteExperimentConfirmation'">
        确定要删除实验吗？此操作将删除所有文件。
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogType === 'deleteExperimentConfirmation'" type="danger" @click="deleteExperiment">确认</el-button>
        <el-button @click="closeDialog">关闭</el-button>
        <el-button v-if="dialogType === 'notification'" type="primary" @click="sendNotification">发送</el-button>
        <el-button v-if="dialogType === 'addParticipant'" type="primary" @click="addParticipant">添加</el-button>
        <el-button v-if="dialogType === 'addObserver'" type="primary" @click="addObserver">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogTitle: "",
        dialogType: "",
        experimentLink: "",
        notificationText: "",
        newParticipantId: "",
        participantFile: null,
        newObserverId: ""
      };
    },
    methods: {
      startExperiment() {
        // Call the backend to start the experiment
        // You can replace the placeholder with the actual backend API call
        // Update the experimentLink variable with the returned experiment link
        // For example:
        // axios.post("/api/start-experiment")
        //   .then(response => {
        //     this.experimentLink = response.data.experimentLink;
        //     this.dialogVisible = true;
        //     this.dialogType = "startExperiment";
        //     this.dialogTitle = "开始实验";
        //   })
        //   .catch(error => {
        //     console.error("Failed to start experiment:", error);
        //   });

        // Placeholder code for demonstration
        // Simulate a delay before obtaining the experiment link
        setTimeout(() => {
          this.experimentLink = "http://example.com/experiment";
          this.dialogVisible = true;
          this.dialogType = "startExperiment";
          this.dialogTitle = "开始实验";
        }, 2000);
      },
      openNotificationDialog() {
        this.dialogVisible = true;
        this.dialogType = "notification";
        this.dialogTitle = "群发通知";
        this.notificationText = "";
      },
      sendNotification() {
        // Send the notification using the this.notificationText value
        console.log("Sending notification:", this.notificationText);
        this.closeDialog();
      },
      openAddParticipantDialog() {
        this.dialogVisible = true;
        this.dialogType = "addParticipant";
        this.dialogTitle = "新增被试";
        this.newParticipantId = "";
      },
      addParticipant() {
        // Add the new participant using the this.newParticipantId value
        console.log("Adding participant:", this.newParticipantId);
        this.closeDialog();
      },
      openImportParticipantsDialog() {
        this.dialogVisible = true;
        this.dialogType = "importParticipants";
        this.dialogTitle = "导入被试";
        this.participantFile = null;
      },
      handleParticipantFileChange(event) {
        this.participantFile = event.target.files[0];
        console.log("Selected participant file:", this.participantFile);
      },
      openAddObserverDialog() {
        this.dialogVisible = true;
        this.dialogType = "addObserver";
        this.dialogTitle = "添加观察者";
        this.newObserverId = "";
      },
      addObserver() {
        // Add the new observer using the this.newObserverId value
        console.log("Adding observer:", this.newObserverId);
        this.closeDialog();
      },
      openDeleteExperimentConfirmation() {
        this.dialogVisible = true;
        this.dialogType = "deleteExperimentConfirmation";
        this.dialogTitle = "删除实验";
      },
      deleteExperiment() {
        // Delete the experiment and all files
        this.closeDialog();
      },
      closeDialog() {
        this.dialogVisible = false;
        this.dialogType = "";
        this.dialogTitle = "";
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
