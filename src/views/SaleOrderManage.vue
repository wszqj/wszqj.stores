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
const ordersData = [
  {
    id: '1',
    supplier_name: '张三1',
    supplier_phone: '16666666666',
    sale_person_name: '李四1',
    sale_person_phone: '18888888888',
    amount_payable:'9999',
    actually_paid_amount: '99',
    sale_time: '2024-3-16 14:57:00'
  },
  {
    id: '2',
    supplier_name: '张三2',
    supplier_phone: '16666666666',
    sale_person_name: '李四2',
    sale_person_phone: '18888888888',
    amount_payable:'9999',
    actually_paid_amount: '99',
    sale_time: '2024-3-16 14:57:00'
  },
  {
    id: '3',
    supplier_name: '张三3',
    supplier_phone: '16666666666',
    sale_person_name: '李四3',
    sale_person_phone: '18888888888',
    amount_payable:'9999',
    actually_paid_amount: '99',
    sale_time: '2024-3-16 14:57:00'
  },
  {
    id: '4',
    supplier_name: '张三4',
    supplier_phone: '16666666666',
    sale_person_name: '李四',
    sale_person_phone: '18888888888',
    amount_payable:'9999',
    actually_paid_amount: '99',
    sale_time: '2024-3-16 14:57:00'
  },
]
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>销售订单管理</span>
        <div class="extra">
          <el-button type="primary">添加订单</el-button>
        </div>
      </div>
    </template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="请输入你要搜索的内容">
        <el-input v-model="formInline.user" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="ordersData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="100"/>
      <el-table-column prop="supplier_name" label="交易对象" width="120"/>
      <el-table-column prop="supplier_phone" label="联系方式"/>
      <el-table-column prop="sale_person_name" label="售货人" width="120"/>
      <el-table-column prop="sale_person_phone" label="联系方式"/>
      <el-table-column prop="amount_payable" label="应付金额（元）"/>
      <el-table-column prop="actually_paid_amount" label="实付金额（元）"/>
      <el-table-column prop="sale_time" label="交易时间"/>
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
