<template>
  <div class="manage-container">
    <h2>管理实验</h2>
    <div class="button-group">
      <el-button type="primary" class="manage-button">一键分发</el-button>
      <el-button type="primary" class="manage-button" :disabled="runningExp" @click="startExperiment">开始实验</el-button>
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
    <el-table :data="users"     
    :header-cell-style="{'text-align':'center'}"
    :cell-style="{'text-align':'center'}"
    style="width: 30%; margin-top: 20px;margin-left: 33%;">
        <el-table-column prop="username" label="被试者名单"></el-table-column>
      </el-table>
  </div>
</template>

<script>
function timestampToTime(times) {
    let time = times[1]
    let mdy = times[0]
    mdy = mdy.split('/')
    let month = parseInt(mdy[0]);
    let day = parseInt(mdy[1]);
    let year = parseInt(mdy[2])
    return year + '-' + month + '-' + day + ' ' + time
}
import {getParticipantByExpId} from '@/api/Exp'
import { removeExpRec } from '@/api/Exp';
import { CLInterface } from '@/api/cmdline';
import { updateExpRec } from '@/api/Exp';
  export default {
    data() {
      return {
        users: [],
        runningExp:false,
        experiment:[],
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
    created() {
      this.experiment=this.$route.query
    },
    mounted(){
      getParticipantByExpId(this.experiment.id).then((_)=>{
        console.log(_)
        if(_.code === 114514){
          this.$message.error('没有权限查看')
        }
        else{
          this.users=_.data
        }
      })
    },
    methods: {
      startExperiment() {
        CLInterface("./test.sh start "+this.experiment.directory).then((_)=>{
          if(_ === "启动服务失败"){
            this.$message.error(_)
          }
          else{
            this.experimentLink=_
            this.runningExp=true
            let time = new Date()
            this.experiment.active_time = timestampToTime(time.toLocaleString('en-US',{hour12: false}).split(" "))
            updateExpRec(this.experiment)
            /* this.experimentLink="https://www.baidu.com" */
            setTimeout(() => {
            this.dialogVisible = true;
            this.dialogType = "startExperiment";
            this.dialogTitle = "开始实验";
        }, 2000);
          }
        })
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
        CLInterface("rm -r "+this.experiment.directory)
        console.log(this.experiment)
        removeExpRec(this.experiment).then((_)=>{
          if(_.code === 200){
            this.$message.success("删除成功")
            this.closeDialog();
            this.$router.push("/experiment/createModule/createMain")
          }
        })

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
