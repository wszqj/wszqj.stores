<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {ref} from 'vue'
import {ElMessage} from "element-plus";
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
//定义数据模型
const registerData = ref({
  username: '',
  password: '',
  rePassword: ''
})
//校验密码的函数
const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请在次确认密码'))
  } else if (value !== registerData.value.password) {
    callback(new Error('请确保两次输入的密码一致'))
  } else {
    callback()
  }
}

//定义校验规则
const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 5, max: 16, message: '长度为5~16位的非空字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 5, max: 16, message: '长度为5~16位的非空字符', trigger: 'blur'}
  ],
  rePassword: [
    {validator: checkRePassword, trigger: 'blur'}
  ]
}

//调用后台接口，完成注册
import {userRegisterService, userLoginService} from "@/api/user.js";

const register = async () => {
  let result = await userRegisterService(registerData.value);
  ElMessage.success(result.msg ? result.msg : '注册成功')
}

//用户登录
import {useRouter} from "vue-router";
import {useTokenStore} from "@/stores/token.js";

let router = useRouter();
let tokenStore = useTokenStore();
const login = async () => {
  let result = await userLoginService(registerData.value);
  ElMessage.success(result.msg ? result.msg : '登录成功')
  //获取并且添加token
  tokenStore.setToken(result.data)
  await router.push('/')
}
const clearRegisterData = () => {
  registerData.value = {
    username: '',
    password: '',
    rePassword: ''
  }
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-card ref="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <transition name="fade">
          <!-- 注册表单 -->
          <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
            <el-form-item>
              <h1 class="titleFont">注册</h1>
            </el-form-item>
            <el-form-item prop="username">
              <el-input :prefix-icon="User" id="register_username"  placeholder="请输入用户名"
                        v-model="registerData.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input :prefix-icon="Lock" id="register_password"  type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
            </el-form-item>
            <el-form-item prop="rePassword">
              <el-input :prefix-icon="Lock" id="register_rePassword"  type="password" placeholder="请再次输入密码"
                        v-model="registerData.rePassword"></el-input>
            </el-form-item>
            <!-- 注册按钮 -->
            <el-form-item>
              <el-button id="register" class="button" type="primary" auto-insert-space @click="register()">
                注册
              </el-button>
            </el-form-item>
            <el-form-item class="flex">
              <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()">
                ← 返回
              </el-link>
            </el-form-item>
          </el-form>
          <!-- 登录表单 -->
          <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
            <el-form-item>
              <h1 class="titleFont">登录</h1>
            </el-form-item>
            <el-form-item prop="username">
              <el-input class="input" :prefix-icon="User" placeholder="请输入用户名"
                        v-model="registerData.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
            </el-form-item>
            <el-form-item class="flex">
              <div class="flex">
                <el-checkbox>记住我</el-checkbox>
                <el-link type="primary" :underline="false">忘记密码？</el-link>
              </div>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
              <el-button id="login" class="button" type="primary" auto-insert-space @click="login()">登录</el-button>
            </el-form-item>
            <el-form-item class="flex">
              <el-link id="register_link" type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
                注册 →
              </el-link>
            </el-form-item>
          </el-form>
          </transition>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 定义过渡的类名 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* 样式 */
.login-page {
  height: 100vh;
  width: 100%;
  background-color: #fff;

  @font-face {
    font-family: 'font1'; /* 使用您的字体名称 */
    src: url('@/assets/font/字酷堂海藏楷体.ttf') format('truetype'); /* 字体文件的路径 */
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'font2'; /* 使用您的字体名称 */
    src: url('@/assets/font/千辛万苦.otf') format('truetype'); /* 字体文件的路径 */
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'font3'; /* 使用您的字体名称 */
    src: url('@/assets/font/方正经黑简体.TTF') format('truetype'); /* 字体文件的路径 */
    font-weight: normal;
    font-style: normal;
  }

  // 登录与注册文字定位与样式
  .titleFont {
    margin: 0 auto;
  }

  // 左侧logo样式
  .bg {
    /* 现有的背景设置 */
    border-radius: 0 20px 20px 0;
    background: linear-gradient(to right,#00fd92,#00abf2) no-repeat 10% 10%;
    //background: linear-gradient(to right, #fbc2eb, #a6c1ee) no-repeat 60% 60%;
    position: relative; /* 设置相对定位，为伪元素定位做准备 */
  }

  // 表单背景卡片样式
  .card {
    width: 190px;
    height: 254px;
    margin: 0 auto;
    background-color: red;
    border-radius: 8px;
    z-index: 1;
  }

  .tools {
    display: flex;
    align-items: center;
    padding: 9px;
  }

  .circle {
    padding: 0 4px;
  }

  .box {
    display: inline-block;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 1px;
    border-radius: 50%;
  }

  .red {
    background-color: #ff605c;
  }

  .yellow {
    background-color: #ffbd44;
  }

  .green {
    background-color: #00ca4e;
  }

  .bg::before {
    content: ''; /* 伪元素需要content属性 */
    position: absolute; /* 绝对定位，相对于.bg元素 */
    top: 300px; /* 根据需要调整位置 */
    left: 190px; /* 根据需要调整位置 */
    width: 400px; /* logo图片的宽度 */
    height: 300px; /* logo图片的高度 */
    background: url('@/assets/wszqjlogo.png') no-repeat center / contain; /* 添加logo图片 */
  }

  // 表单样式
  .form {
    height: 440px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    margin-top: 200px;

    .title {
      margin: 0 auto;
    }

    // 按钮样式
    button {
      text-decoration: none;
      position: relative;
      border: none;
      font-size: 18px;
      font-family: inherit;
      cursor: pointer;
      color: #fff;
      width: 100%;
      height: 30px;
      line-height: 2em;
      text-align: center;
      background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
      background-size: 300%;
      border-radius: 30px;
      z-index: 1;
    }

    button:hover {
      animation: ani 8s linear infinite;
      border: none;
    }

    @keyframes ani {
      0% {
        background-position: 0%;
      }

      100% {
        background-position: 400%;
      }
    }

    button:before {
      content: "";
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      z-index: -1;
      background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
      background-size: 400%;
      border-radius: 35px;
      transition: 1s;
    }

    button:hover::before {
      filter: blur(20px);
    }

    button:active {
      background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    }


    // 登录与注册切换链接定位
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    // 该方法可以修改标签的样式
    /*    .el-input::v-deep .el-input__inner {
          background-color: red;
        }*/
    /*    .el-input{
          //--el-input-width: 50%;
        }*/

    // 输入框样式
    .el-input {
      width: 100%;
      height: 45px;
      line-height: 30px;
      border: 2px solid transparent;
      border-radius: 10px;
      outline: none;
      background-color: #f8fafc;
      color: #0d0c22;
      transition: .5s ease;
    }

    .el-input::placeholder {
      color: #94a3b8;
    }

    /* 注意这里的选择器，需要是 .el-input 而不是 input */
    .el-input:focus, .el-input:hover {
      outline: none;
      border-color: rgba(129, 140, 248, 1);
      background-color: #fff;
      /* 使用正确的 rgba 语法，而不是 rgb */
      box-shadow: 0 0 0 5px rgba(129, 140, 248, 0.3);
    }
  }
}
</style>