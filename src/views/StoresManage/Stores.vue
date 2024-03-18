<script setup>
import {
  Edit,
  Delete
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
const storeData = [
  {
    id: '1',
    name: '仓库1',
    address: '河南省商丘市宁陵县',
    capacity: '200平米',
    type: '正常'
  },
  {
    id: '2',
    name: '仓库2',
    address: '河南省商丘市宁陵县',
    capacity: '200平米',
    type: '正常'
  },
  {
    id: '3',
    name: '仓库3',
    address: '河南省商丘市宁陵县',
    capacity: '200平米',
    type: '正常'
  },
  {
    id: '4',
    name: '仓库4',
    address: '河南省商丘市宁陵县',
    capacity: '200平米',
    type: '正常'
  },
]
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>仓库管理</span>
        <div class="extra">
          <el-button type="primary">添加仓库</el-button>
        </div>
      </div>
    </template>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="仓库名称">
          <el-input v-model="formInline.user" placeholder="仓库名称" clearable/>
        </el-form-item>
        <el-form-item label="仓库状态">
          <el-select
              v-model="formInline.region"
              placeholder="正常"
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
    <el-table :data="storeData" style="width: 100%">
      <el-table-column prop="id" label="仓库序号" width="180"/>
      <el-table-column prop="name" label="仓库名称" width="180"/>
      <el-table-column prop="address" label="仓库地址"/>
      <el-table-column prop="capacity" label="容量"/>
      <el-table-column prop="type" label="仓库状态"/>
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
