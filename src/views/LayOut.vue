<script lang="ts" setup>
import {
  Menu as IconMenu,
  Setting, User, Van, List, View,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <!--  element-plus中的容器-->
  <el-container class="layout-container">
    <!--    头部区域-->
    <el-header class="el-header">Header</el-header>
    <!--  element-plus中的容器-->
    <el-container>
      <!--      左侧菜单-->
      <el-aside class="el-aside">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >

              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <View/>
                  </el-icon>
                  <span>数据报表</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/dataReport/sell">销售数据</el-menu-item>
                  <el-menu-item index="/dataReport/clients">客流量报表</el-menu-item>
                  <el-menu-item index="/dataReport/stockWithGoods">进货数据</el-menu-item>
                  <el-menu-item index="/dataReport/goodsPrice">进货报价</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                <el-icon>
                  <List/>
                </el-icon>
                <span>订单管理</span>
                </template>
                <el-menu-item-group index="2-1">
                  <el-menu-item index="/common/sellOrderManage">销售订单</el-menu-item>
                  <el-menu-item index="/common/buyOrderManage">进货订单</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon>
                    <icon-menu/>
                  </el-icon>
                  <span>仓库管理</span>
                </template>
                <el-menu-item index="/storesManage/stores">仓库列表</el-menu-item>
                <el-sub-menu index="3-2">
                  <template #title>仓库详情</template>
                  <el-menu-item index="/storesManage/storesDetails">仓库1</el-menu-item>
                  <el-menu-item index="3-2-2">仓库2</el-menu-item>
                  <el-menu-item index="3-2-3">仓库3</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-menu-item index="/common/clientManage">
                <el-icon>
                  <User/>
                </el-icon>
                <span>客户管理</span>
              </el-menu-item>
              <el-menu-item index="/common/SupplierManage">
                <el-icon>
                  <Van/>
                </el-icon>
                <span>供应商管理</span>
              </el-menu-item>
              <el-menu-item index="/common/PersonalCenter">
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
          <!--          <StoresManage/>-->
          <router-view></router-view>
        </el-main>
        <!--        底部版权-->
        <el-footer class="el-footer">
          <el-text class="mx-1">CreatBy © 河南科技大学 wszqj</el-text>
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

.layout-container {
  height: 100vh;

  .el-header {
    height: 100px;
    width: auto;
    background-color: aqua;
  }

  .el-aside {
    height: 815px;
    width: 200px;
    //background-color: bisque;
  }

  .el-main {
    height: 750px;
    width: auto;
    //background-color: blue;
  }

  .el-footer {
    height: 35px;
    width: auto;
    text-align: center;
    font-size: 15px;
  }
}
</style>