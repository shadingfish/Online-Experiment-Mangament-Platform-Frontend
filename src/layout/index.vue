<template>
  <div>
     <div class="header">
         <div class="logo">&nbsp&nbsp&nbsp&nbsp行为科学实验管理平台 </div>

         <div class="sidebar-toggle" @click="toggleSidebar">
         <i class="el-icon-s-fold" v-show="!isSidebarCollapsed" ></i>
         <i class="el-icon-s-unfold" v-show="isSidebarCollapsed" ></i>
        </div>
 
     
        <div class="header-right">
        <div class="headeruser" >
          <el-avatar class="user-avator" :size="35" :src="imgurl"  style="margin-right: 5px;"/>
          <el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link" >
            {{ username }}
            <div class="margin"  style="margin-right: 4px;"></div>
						<el-icon class="el-icon-arrow-down" >
						</el-icon>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item command="changeInfo">修改信息</el-dropdown-item>
					<el-dropdown-item divided command="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出登录</el-dropdown-item> 
						</el-dropdown-menu>
					</template>
				</el-dropdown>

          </div>
      </div>
      </div>
 
       <!-- <div class="header-right">
     <div class="header-user-con">
  
 
    <el-avatar class="user-avator" :size="30" :src="doge" />
       <el-dropdown class="user-name" trigger="click" @command="handleCommand">
         <span class="el-dropdown-link">
           {{ username }}
           <i class="el-icon-arrow-down el-icon--right"></i>
         </span>
         <template v-slot:dropdown>
           <el-dropdown-menu>
             <el-dropdown-item command="user">个人中心</el-dropdown-item>
             <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
           </el-dropdown-menu>
         </template>
       </el-dropdown>
     </div>
   </div> -->


       <div class="side-bar" :class="{ 'collapsed': isSidebarCollapsed }">
 
         <el-menu
           class="el-menu-vertical-demo"
           :collapse="isSidebarCollapsed"
           :default-active="activeMenu"
           :style="{ background: 'linear-gradient(to bottom, #800000, #A33A3A, #FDB3B3)' }"
           text-color="#ffffff"
           active-text-color="#08B2F0"
         >
         <div class="space3"></div>
           <el-menu-item index="/"  @click="$router.push('/')">
             <i class="el-icon-house white-style" ></i>
             <span slot="title">返回首页</span>
           </el-menu-item>


           <el-menu-item index="/rbac/user/List" @click="$router.push('/rbac/user/List')">
             <i class="el-icon-user-solid white-style" ></i>
             <span slot="title">被试者名单</span>
           </el-menu-item>
           <el-menu-item index="/experiment/createModule/createMain" @click="$router.push('/experiment/createModule/createMain')">
             <i class="el-icon-cpu white-style" ></i>
             <span slot="title">我创建的实验</span>
           </el-menu-item>
           <el-menu-item index="/experiment/participateModule/participateMain" @click="$router.push('/experiment/participateModule/participateMain')">
             <i class="el-icon-cpu white-style"></i>
             <span slot="title">我参与的实验</span>
           </el-menu-item>
           <el-menu-item index="/Exp/ExpModule/PythonMain" @click="$router.push('/Exp/ExpModule/PythonMain')">
             <i class="el-icon-cpu white-style" ></i>
             <span slot="title">Python解释器</span>
           </el-menu-item>

           <!-- <el-submenu index="/rbac/user/userinfo" :class="{ 'menu-item-hover': activeMenu === '/rbac/user/userinfo' }">
          <template slot="title">
            <i class="el-icon-circle-plus-outline white-style"></i>
            <span slot="title">修改用户信息</span>
          </template>
          <el-menu-item index="/rbac/user/userinfo" style="background-color: #6b3333;" @click="$router.push('/rbac/user/userinfo')" :class="{ 'menu-item-hover': activeMenu === '/rbac/user/userinfo' }">
            <span slot="title">修改个人信息</span>
          </el-menu-item>
          <el-menu-item index="/rbac/user/ChangePassword" style="background-color: #A33A3A;" @click="$router.push('/rbac/user/ChangePassword')" :class="{ 'menu-item-hover': activeMenu === '/rbac/user/userinfo' }">
            <span slot="title">修改密码</span>
          </el-menu-item>
        </el-submenu> -->

        <el-submenu index="/rbac/user/userinfo" :class="{ 'menu-item-hover': activeMenu === '/rbac/user/userinfo' }">
  <template slot="title">
    <i class="el-icon-circle-plus-outline white-style"></i>
    <span slot="title">修改用户信息</span>
  </template>
  <el-menu-item index="/rbac/user/userinfo" class="menu-item-with-background1" @click="$router.push('/rbac/user/userinfo')" :class="{ 'menu-item-hover': activeMenu === '/rbac/user/userinfo' }">
    <span slot="title">修改个人信息</span>
  </el-menu-item>
  <el-menu-item index="/rbac/user/ChangePassword" class="menu-item-with-background2" @click="$router.push('/rbac/user/ChangePassword')" :class="{ 'menu-item-hover': activeMenu === '/rbac/user/ChangePassword' }">
    <span slot="title">修改密码</span>
  </el-menu-item>
</el-submenu>


           <el-menu-item index="/rbac/user/about" @click="$router.push('/about')">
             <i class="el-icon-setting white-style" ></i>
             <span slot="title">关于</span>
           </el-menu-item>
           <el-menu-item index="/logout"  @click="logout">
             <i class="el-icon-switch-button white-style"></i>
             <span slot="title">退出</span>
           </el-menu-item>
         </el-menu>
 
         <div class="main-content">
           <router-view/>
         </div>
       </div>

    </div>
   </template>
   
   <script>
 import { removeToken } from '@/util/auth'; // 导入removeToken函数
 import router from '@/router'; // 导入router对象
 import { MessageBox } from 'element-ui'; // 导入MessageBox组件
 import { getInfo } from "@/api/user";
 import imgurl from '../assets/tree.png';


   export default {
     name: "MyComponent",
     data() {
       return {
         isSidebarCollapsed: false,
         activeMenu: "/",
         username: "",
         imgurl:imgurl,
       };
     },
     mounted() {
    getInfo().then((res) => {
      this.username = res.data.username;
    });
  },
     methods: {
       toggleSidebar() {
         this.isSidebarCollapsed = !this.isSidebarCollapsed;
       },
       handleCommand(command) {
         if (command === "logout") {
           this.logout();
         }else if (command === "changeInfo"){
          router.push('/rbac/user/userinfo')
         }else if (command === "changePassword"){
          router.push('/rbac/user/ChangePassword')

         }
         // Handle other commands if needed
       },
 logout() {
   this.$confirm("确定注销并退出系统吗？", "提示").then(() => {
     removeToken();
     console.log("跳转到登录页面");
     this.$router.push({ path: "/login" });
   }).catch(() => {});
 },
     },
   };
   </script>
   
   <style scoped>
  .header {
   position: relative;
   box-sizing: border-box;
   width: 100%;
   height: 70px;
   font-size: 22px;
   color: #fff;
   background-image: url("../assets/pkuheader4.jpg");
   background-repeat: no-repeat;
   background-size: 100% 100%;
 }
 
 .header .logo {
   float: left;
   width: 250px;
   line-height: 70px;
   font-weight: bold;
 }
 
 .collapse-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	float: left;
	padding: 0 21px;
	cursor: pointer;
}

.header-left {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

 .sidebar-toggle {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	float: left;
	padding: 0 21px;
	cursor: pointer;
 }

 .backgroundcolor{
  background-color: #A33A3A;
 }

 
 .side-bar {
   display: flex;
   height: 100vh;
 
 
 
 }
 
 .el-menu-vertical-demo .el-menu-item,
 .el-menu-vertical-demo .el-submenu,
 .el-menu-vertical-demo .el-submenu__title {
   text-align: left;
   font-weight: bold;
   color: #fff;
 }
 
 .collapsed .el-menu-item .el-icon {
   margin-right: 0;
   color: #fff;
 }
 
 .main-content {
   flex: 1;
   padding: 20px;
   overflow-y: auto;
 }
 
 .white-style{
   color: #fff;
 }
 .space3{
   height:15px;
 }
 .header-dropdown {
   float: right;
   margin-right: 20px;
 }

 .header-right {
	float: right;
	padding-right: 50px;
}
.headeruser {
	display: flex;
	height: 70px;
	align-items: center;
}

/* .headeruser {
  display: flex;
  height: 70px; 
  align-items: center;
  justify-content: flex-end;
  margin-right: 30px; 
} */
.btn-fullscreen {
	transform: rotate(45deg);
	margin-right: 5px;
	font-size: 24px;
}

.user-name {
	margin-left: 10px;
  font-weight: 600;
  font-size: 17px;
}

.user-avator {
	margin-left: 20px;
}
.el-dropdown-link {
	color: #fff;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.el-dropdown-menu__item {
	text-align: center;
}
.el-menu {
  flex: 0.16;
}

.el-submenu__title {
  width: 100%;
}
.el-menu-item:hover {
  background-color: #A33A3A;


}
.el-submenu:hover{
  background-color: #A33A3A;
}

.el-menu-item {
  transition: background-color 0.3s, color 0.3s;
} 

.menu-item-hover .el-submenu__title {
  background-color: #A33A3A;

}
.menu-item-hover {
  background-color: #A33A3A;
  color: blue;
}


.menu-item-with-background1 {
  background-color: #A33A3A;
}

.menu-item-with-background1:hover {
  background-color: #ad3d3d;
}

.menu-item-with-background2 {
  background-color: #a23f3f;
}

.menu-item-with-background2:hover {
  background-color: #ae4a4a;
}


   </style>