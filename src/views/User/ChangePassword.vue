<template>
    <div class="add-user">
      <h1>修改密码</h1>
      <el-form ref="form" :model="user" :rules="rules" label-width="100px">
        <el-form-item label="请输入新密码" prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { ChangePassword } from "@/api/login";
  import { getInfo } from "@/api/user";
  export default {
    name: "ChangePassword",
    data() {
      return {
        user: {
          password: "",
          name: ""
        },
        rules: {
          password: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        },
      };
    },
    methods: {
      submitForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            getInfo().then((res) => {
            this.user.name = res.data.username;
            ChangePassword(this.user.name,this.user.password)
            this.$message({
                message: '密码修改成功',
                type: 'success'
              })
            });
            // TODO: send user data to backend
          } else {
            console.log("form validation failed");
          }
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      },
    },
  };
  </script>
  
  <style>
  .add-user {
    padding: 20px;
  }
  </style>