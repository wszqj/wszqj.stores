<script setup>
import {
  Edit,
  Delete, Message
} from '@element-plus/icons-vue'

import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}
const clientsData = [
  {
    id: '1',
    name: '张三1',
    phone: '16666666666',
    address: '河南省',
    grade: '5',
    create_time: '2024-3-16 14:57:00',
    update_time: '2024-3-16 14:57:00'
  },
  {
    id: '2',
    name: '张三2',
    phone: '16666666666',
    address: '河南省',
    grade: '5',
    integration:'999',
    create_time: '2024-3-16 14:57:00',
    update_time: '2024-3-16 14:57:00'
  },
  {
    id: '3',
    name: '张三3',
    phone: '16666666666',
    address: '河南省',
    grade: '5',
    integration:'999',
    create_time: '2024-3-16 14:57:00',
    update_time: '2024-3-16 14:57:00'
  },
  {
    id: '4',
    name: '张三4',
    phone: '16666666666',
    address: '河南省',
    grade: '5',
    integration:'999',
    create_time: '2024-3-16 14:57:00',
    update_time: '2024-3-16 14:57:00'
  },
]
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>供应商管理</span>
        <div class="extra">
          <el-button type="primary">添加供应商</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="供应商名称">
        <el-input v-model="formInline.user" placeholder="客户名称" clearable/>
      </el-form-item>
      <el-form-item label="供应商手机号">
        <el-select
            v-model="formInline.region"
            placeholder="客户手机号"
            clearable
        >
          <el-option label="正常" value="shanghai"/>
          <el-option label="停用" value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="clientsData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="100"/>
      <el-table-column prop="name" label="姓名" width="100"/>
      <el-table-column prop="phone" label="联系方式"/>
      <el-table-column prop="address" label="家庭住址" width="200"/>
      <el-table-column prop="grade" label="星级"/>
      <el-table-column prop="create_time" label="创建时间"/>
      <el-table-column prop="update_time" label="修改时间"/>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button :icon="Edit" plain type="primary" circle/>
          <el-button :icon="Delete" plain type="danger" circle/>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
