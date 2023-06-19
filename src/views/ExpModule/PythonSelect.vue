<template>
    <div>
      <el-upload
        class="upload-demo"
        action="http://43.142.90.238:28080/api/upload"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :headers="uploadHeaders"
      >
        <el-button type="primary">点击上传</el-button>
      </el-upload>
        <el-table ref="filterTable"
                  :data="tableData"
                  style="width: 100%; text-align: center">
          <el-table-column prop="title" label="名称">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
          </el-table-column>
          <el-table-column prop="active_time" label="上次运行时间">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="do_exec(scope.$index)">运行</el-button>
<!--               aaaa
              bbbb -->
              <el-button type="text" size="small" @click="do_remove(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    <div>
      <span>执行结果：</span>
      <el-input type="textarea" v-model="result" rows="6" readonly></el-input>
    </div>
    </div>
  </template>
  
  <script>
  import { CLInterface } from "@/api/cmdline"
  import { getFileRec } from "@/api/file"
  import { formatTimestamps } from "@/util/timeconvert"
  import { revertTimestamps } from "@/util/timeconvert"
  import { updateFileRec } from "@/api/file"
  import { removeFileRec } from "@/api/file"
  var itemdata=[];
  export default {
    data() {
      return {
        tableData:[],
        uploadUrl: '/your-upload-url',
        command: '',
        result: '',
        uploadHeaders: {
        Authorization: localStorage.getItem('ACCESS_TOKEN')
      }
      }
    },
    mounted() {
      getFileRec('python').then((_)=>{
        this.tableData=formatTimestamps(_.data)
      })
      getFileRec('python').then((_)=>{
        itemdata=_.data
      })
    },
    methods: {
      beforeUpload(file) {
        const validExtensions = ['.py']
        const extension = file.name.slice(file.name.lastIndexOf('.'))
        if (!validExtensions.includes(extension)) {
          this.$message.error('只能上传.py 文件')
          return false
        }
        
        // 如果需要限制文件大小，可以添加以下代码
         const maxSize = 2 * 1024 * 1024; // 2MB
         if (file.size > maxSize) {
           this.$message.error('文件大小不能超过 2MB')
           return false
         }
        
        return true
      },
      handleSuccess(response, file) {
        this.$message.success('文件上传成功')
        location.reload()
      },
      handleError(err, file) {
        this.$message.error('文件上传失败')
      },
      do_exec(data){
        console.log(itemdata[data])
        updateFileRec(itemdata[data]).then((_)=>{
          console.log(_)
        })
        CLInterface("python3 "+this.tableData[data].directory).then((res)=>{
          this.result=res
        })
        
      },
      do_remove(data){
        removeFileRec(itemdata[data]).then((_)=>{
          console.log(_)
        })
        CLInterface("rm "+itemdata[data].directory).then((res)=>{
          this.result=res
          location.reload()
        })
      }
    }
  }
  </script>
  