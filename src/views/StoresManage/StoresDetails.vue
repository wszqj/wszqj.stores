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
    product_pic: '',
    product_name: '椅子',
    purchasing_price: '20',
    price: '29',
    quantity: '100',
    supplier: '李四'
  },
  {
    id: '2',
    product_pic: '',
    product_name: '椅子',
    purchasing_price: '20',
    price: '29',
    quantity: '100',
    supplier: '李四'
  },
  {
    id: '3',
    product_pic: '',
    product_name: '椅子',
    purchasing_price: '20',
    price: '29',
    quantity: '100',
    supplier: '李四'
  },
  {
    id: '4',
    product_pic: '',
    product_name: '椅子',
    purchasing_price: '20',
    price: '29',
    quantity: '100',
    supplier: '李四'
  },
]
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>货物仓库管理</span>
        <div class="extra">
          <el-button type="primary">添加货品</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="供应商名称">
        <el-input v-model="formInline.user" placeholder="供应商名称" clearable/>
      </el-form-item>
      <el-form-item label="产品类型">
        <el-select
            v-model="formInline.region"
            placeholder="正常"
            clearable
        >
          <el-option label="椅子" value="shanghai"/>
          <el-option label="床" value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item label="价格区间">
        <el-select
            v-model="formInline.region"
            placeholder="正常"
            clearable
        >
          <el-option label="50-99" value="shanghai"/>
          <el-option label="100-200" value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="storeData" style="width: 100%">
      <el-table-column prop="id" label="货物序号" width="180"/>
      <el-table-column prop="product_pic" label="产品样图" width="180"/>
      <el-table-column prop="product_name" label="产品名称"/>
      <el-table-column prop="purchasing_price" label="进货价格"/>
      <el-table-column prop="price" label="销售价格"/>
      <el-table-column prop="quantity" label="库存数量"/>
      <el-table-column prop="supplier" label="供应商"/>
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
