<script setup>
import {
  Menu as IconMenu,
  Setting, User, Van, List, CaretBottom, Crop, EditPen, SwitchButton, GoodsFilled, View, House, Tickets, Goods,
} from '@element-plus/icons-vue'
import avatar from '@/images/logo7.png'
import {ref} from "vue";

const username = ref('wszqj')
</script>

<template>
  <!--  element-plus中的容器-->
  <el-container class="layout-container">
    <!--    头部区域-->
    <el-header class="el-header">
      <div class="logo">
        <img src="@/images/logo10.png" alt="">
        <span class="header_slogan shadow">
          <p style="margin-top: 15px;color: #00ca4e">WSZQJ——商家管理平台</p>
        </span>
        <div class="avatar">
          <el-dropdown placement="bottom-end" style="float: right;margin-right: 20px">
                    <span class="el-dropdown__box">
                        <el-avatar :src="avatar"/>
                        <el-icon>
                            <CaretBottom/>
                        </el-icon>
                    </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
                <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="welcome">
          <div style="float: right; margin-right: 55px">欢迎您：{{ username }}</div><br>
          <div style="float: left">
            <div class="spinner">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

    </el-header>
    <!--  element-plus中的容器-->
    <el-container style="background-color: white">
      <!--      左侧菜单-->
      <el-aside class="el-aside">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                router
            >
              <el-menu-item index="/dataReport">
                <template #title>
                  <el-icon>
                    <View/>
                  </el-icon>
                  <span>数据报表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/orders">
                <template #title>
                  <el-icon><Tickets /></el-icon>
                  <span>订单管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/stores">
                <template #title>
                  <el-icon><House /></el-icon>
                  <span>仓库管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/product">
                <template #title>
                  <el-icon><Goods /></el-icon>
                  <span>商品管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/customer">
                <el-icon>
                  <User/>
                </el-icon>
                <span>客户管理</span>
              </el-menu-item>
              <el-menu-item index="/supplier">
                <el-icon>
                  <Van/>
                </el-icon>
                <span>供应商管理</span>
              </el-menu-item>
              <el-menu-item index="/user/userInfo">
                <el-icon>
                  <setting/>
                </el-icon>
                <span>个人中心</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <!--        主区域-->
      <el-container>
        <el-main class="el-main">
          <router-view v-slot="{ Component }">
            <transition name="slide">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
        <!--        底部版权-->
        <el-footer class="el-footer">
          <el-text class="mx-1">CreateBy © 河南科技大学 绿意云端-wszqj</el-text>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

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
  font-family: 'font1'; /* 使用您的字体名称 */
  src: url('@/assets/font/FZWBJW.TTF') format('truetype'); /* 字体文件的路径 */
  font-weight: normal;
  font-style: normal;
}

.layout-container {
  height: 100vh;
  .el-header {
    height: 100px;
    width: auto;
    background-color: #F8FBFE;

    .logo img {
      width: 199px;
      height: 100px;
      float: left;
      padding-right: 1px;
      background-color: #eeefff;
    }
    .header_slogan{
      width: 700px;
      height: 80px;
      text-align: center;
      font-family: font1, '微软雅黑',serif;
      font-size: 45px;
      font-weight: 500;
      float: left;
      margin-left: 330px;
      margin-top: 10px;
    }

    .avatar {
      width: 100px;
      height: 100px;
      float: right;
      margin-right: 10px;
      margin-top: 20px;
      //background-color: #43465f;
    }

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
    .welcome{
      float: right;
      margin-right: 20px;
      font-size: 20px;
      font-weight: bolder;
      font-family: font1, '微软雅黑',serif;
      height: 100px;
      margin-top: 20px;
    }
    .spinner {
       position: relative;
       width: 60px;
       height: 60px;
       display: flex;
       justify-content: center;
       align-items: center;
       border-radius: 50%;
       //margin-left: -75px;
     }

    .spinner span {
      position: absolute;
      top: 50%;
      left: var(--left);
      width: 35px;
      height: 7px;
      background: #ffff;
      animation: dominos 1s ease infinite;
      box-shadow: 2px 2px 3px 0px black;
    }

    .spinner span:nth-child(1) {
      --left: 80px;
      animation-delay: 0.125s;
    }

    .spinner span:nth-child(2) {
      --left: 70px;
      animation-delay: 0.3s;
    }

    .spinner span:nth-child(3) {
      left: 60px;
      animation-delay: 0.425s;
    }

    .spinner span:nth-child(4) {
      animation-delay: 0.54s;
      left: 50px;
    }

    .spinner span:nth-child(5) {
      animation-delay: 0.665s;
      left: 40px;
    }

    .spinner span:nth-child(6) {
      animation-delay: 0.79s;
      left: 30px;
    }

    .spinner span:nth-child(7) {
      animation-delay: 0.915s;
      left: 20px;
    }

    .spinner span:nth-child(8) {
      left: 10px;
    }

    @keyframes dominos {
      50% {
        opacity: 0.7;
      }

      75% {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }

      80% {
        opacity: 1;
      }
    }
  }

  .el-aside {
    height: 815px;
    width: 200px;
    border: 0;
    //margin-top: 10px;
    background-color: #eeefff;
  }

  .el-main {
    height: 740px;
    width: auto;
    margin-top: 10px;
    margin-left: 10px;
  }

  .el-footer {
    height: 25px;
    width: auto;
    text-align: center;
    font-size: 15px;
  }

  // 路由过度效果
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.75s ease-out;
  }


  .slide-enter-to {
    position: absolute;
    right: 0;
  }


  .slide-enter-from {
    position: absolute;
    right: -100%;
  }


  .slide-leave-to {
    position: absolute;
    left: -100%;
  }


  .slide-leave-from {
    position: absolute;
    left: 0;
  }
}
@font-face {
  font-family: 'font1';
  src: url('@/assets/font/FZWBJW.TTF') format('truetype'); /* 字体文件的路径 */
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'font3';
  src: url('@/assets/font/FZYXJW.TTF') format('truetype'); /* 字体文件的路径 */
  font-weight: normal;
  font-style: normal;
}
.el-menu{
  //这行定义了一个CSS自定义属性--el-table-border-color，其值为transparent。这意味着表格的边框颜色将是透明的。
  --el-menu-border-color: transparent;
  //定义了一个自定义属性--el-table-text-color
  --el-menu-text-color: black;
  //当鼠标悬停在表格行上时
  --el-menu-hover-bg-color: #FFF9E9;
  --el-menu-f-bg-color: #FFF9E9;
  --el-menu-bg-color: #eeefff;  /* 75% 透明度的背景颜色 */
  --el-menu-item-font-size: 18px;
  //表格的每一行（<tr>元素）的背景颜色将是透明的。
  --el-menu-item-bg-color: transparent;
  --el-item-font-family: font3, '微软雅黑'; /* 定义字体样式 */
}
.el-menu {
  font-family: var(--el-item-font-family); /* 字体样式 */
  font-weight: normal; /* 字体粗细 */
  font-style: normal; /* 字体风格 */
}
.el-menu .el-menu-item.is-active {
  background-color:#FFF9E9; /* 选中时背景颜色变为红色 */
  border-radius: 20px;
  color: #FF6666; /* 选中时字体颜色变为红色 */
}

.el-menu .el-menu-item { /* 假设 .el-menu-item 是菜单项的选择器 */
  border-radius: var(--some-border-radius, 0); /* 初始圆角半径，这里使用了一个默认值0 */
  background-color: var(--el-menu-bg-color);
  color: var(--el-menu-text-color);
  /* 其他样式 */
}
.el-menu .el-menu-item:hover { /* 鼠标悬停时的样式 */
  background-color: var(--el-menu-hover-bg-color);
  border-radius: 20px; /* 直接设置悬停时的圆角半径为20px */
  /* 其他悬停样式 */
}
</style>