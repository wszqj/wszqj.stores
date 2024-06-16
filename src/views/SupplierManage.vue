<script setup>
import {
  Edit,
  Delete, Search, RefreshRight, Star, Plus
} from '@element-plus/icons-vue'

import {ref} from 'vue'
import {
  deleteSupplierService,
  getSupplierInfoService,
  supplierAddService,
  supplierListService,
  supplierUpdateService
} from "@/api/supplier.js";
import {ElMessage, ElMessageBox} from "element-plus";

//定义函数检查表单的数据是否输入完整
const checkSupplierDate = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入必要信息'))
  } else {
    callback()
  }
}
// 检查等级是否合法
const checkGradeDate = (rule, value, callback) => {
  if (value < 0 || value > 5) {
    callback(new Error('请输入1~5的等级'))
  }
}

//定义校验规则
const rules = {
  companyName: [
    {required: false, message: '请输入公司姓名', trigger: 'blur'},
    {min: 2, max: 15, message: '长度为2~15位的非空字符', trigger: 'blur'},
    {validator: checkSupplierDate, trigger: 'blur'}
  ],
  name: [
    {required: true, message: '请输入供应商姓名', trigger: 'blur'},
    {min: 2, max: 10, message: '长度为2~10位的非空字符', trigger: 'blur'},
    {validator: checkSupplierDate, trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入正确的手机号', trigger: 'blur'},
    {min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'},
    {validator: checkSupplierDate, trigger: 'blur'}
  ],
  address: [
    {required: true, message: '请输入供应商地址', trigger: 'blur'},
    {min: 2, max: 50, message: '请输入供应商地址', trigger: 'blur'},
    {validator: checkSupplierDate, trigger: 'blur'}
  ],
  grade: [
    {required: true, message: '请输入供应商星级', trigger: 'blur'},
    {validator: checkGradeDate, trigger: 'blur'}
  ]
}


//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数
const title = ref('')// 抽屉的状态
//用户搜索时的交易对象
const name = ref('')
//用户搜索时的交易人
const grade = ref('')
//控制抽屉是否显示
const visibleDrawer = ref(false)
//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  supplierList();
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  supplierList();
}

const suppliers = ref([
  {
    "id": 1,
    "companyName": "wszqj",
    "name": '张三1',
    "phone": '16666666666',
    "address": '河南省',
    "grade": 5,
    "createTime": '2024-3-16 14:57:00',
    "updateTime": '2024-3-16 14:57:00'
  }
])
// 定义供应商数据模型
const suppliersModel = ref({
  id: '',
  name: '',
  companyName: '',
  phone: '',
  address: '',
  grade: '',
  createTime: '',
  updateTime: ''
})
// 供应商信息的列表查询
const supplierList = async () => {
  // 封装查询参数
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    name: name.value ? name.value : null,
    grade: grade.value ? grade.value : null
  }
  // 调用接口获取数据
  let result = await supplierListService(params);
  //渲染数据
  total.value = result.data.total;
  suppliers.value = result.data.records;
}
supplierList();

// 删除供应商信息
const deleteSupplier = (row) => {
  ElMessageBox.confirm(
      '你确认要删除该供应商吗?',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //调用接口
        let result = await deleteSupplierService(row.id);
        if (result.message === '删除成功') {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
        } else {
          ElMessage({
            type: 'error',
            message: result.message ? result.message : '删除成功',
          })
        }
        //刷新列表
        await supplierList();
      })
}

// 清空供应商信息数据模型
const clearSuppliersModel = () => {
  suppliersModel.value = {
    id: '',
    name: '',
    companyName: '',
    phone: '',
    address: '',
    grade: '',
    createTime: '',
    updateTime: ''
  }
}
// 新增客户信息
const supplierAdd = async () => {
  // 判断用户输入的信息是否合法(是否为空)
  const isFormValid = Object.values(suppliersModel.value).some(value => String(value).trim() !== '');
  if (!isFormValid) {
    ElMessage.error("供应商信息不能为空");
    return; // 如果所有字段都为空或只包含空格，则显示错误信息并停止执行
  }
  //执行插入
  let result = await supplierAddService(suppliersModel.value);
  ElMessage.success(result.message ? result.message : '添加成功');
  // 清空数据模型
  clearSuppliersModel();
  // 设置抽屉状态
  visibleDrawer.value = false;
  //刷新数据列表
  await supplierList()
}
// 编辑供应商信息
const supplierUpdate = async () => {
  const isFormValid = Object.values(suppliersModel.value).some(value => String(value).trim() !== '')
  if (!isFormValid) {
    ElMessage.error("供应商信息不能为空")
    return;
  }
  //执行更新
  let result = await supplierUpdateService(suppliersModel.value);
  ElMessage.success(result.message ? result.message : '修改成功');
  // 清空数据模型
  clearSuppliersModel();
  // 设置抽屉状态
  visibleDrawer.value = false;
  //刷新数据列表
  await supplierList()
}
// 获取供应商详细信息
const getSupplierInfo = async (row) => {
  // 设置抽屉标题
  title.value = '编辑供应商';
  // 设置抽屉显示
  visibleDrawer.value = true;
  // 调用接口获取信息
  let result = await getSupplierInfoService(row.id);
  // 渲染数据
  suppliersModel.value = result.data
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
<!--        三个点-->
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
<!--        <span style="float: left" class="titleCard">供应商管理</span>-->
        <div class="extra">
          <el-button @click="clearSuppliersModel();title='添加供应商';visibleDrawer=true" id="add">
            <el-icon><Plus /></el-icon>
            <span>添加供应商</span>
          </el-button>
        </div>
      </div>
    </template>
    <!--    搜索表单-->
    <el-form inline class="selectFrom">
      <el-form-item label="供应商姓名：">
        <el-input v-model="name" placeholder="请输入供应商姓名" clearable/>
      </el-form-item>
      <el-form-item label="供应商星级：">
        <el-input v-model="grade" placeholder="请输入供应商星级" clearable/>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="supplierList()">
          <el-icon><Search /></el-icon>
            <span>搜索</span>
        </el-button>
        <el-button @click="name='';grade='';supplierList()">
          <el-icon><RefreshRight /></el-icon>
          <span>重置</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--    数据展示主区域-->
    <el-table :data="suppliers" style="width: 1430px">
      <el-table-column prop="id" label="序号" type="index" width="150"/>
      <el-table-column prop="companyName" label="公司名称"/>
      <el-table-column prop="name" label="姓名"/>
      <el-table-column prop="phone" label="联系方式"/>
      <el-table-column prop="address" label="家庭住址"/>
      <el-table-column prop="grade" label="星级">
        <template #default="{ row }">
        <span v-for="n in row.grade" :key="n" class="star">
          <!-- 这里使用您自己的星星图标，比如使用font-awesome的fa-star -->
          <i><el-icon color="orange"><Star /></el-icon></i>
        </span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="210"/>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button :icon="Edit" class="updateButton" @click="getSupplierInfo(row)" plain type="primary" circle/>
          <el-button :icon="Delete" class="deleteButton" plain type="danger" @click="deleteSupplier(row)" circle/>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页条 -->
    <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5 ,10, 15]"
        layout="jumper, total, sizes, prev, pager, next"
        background
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
    />

    <!--    抽屉-->
    <el-drawer v-model="visibleDrawer" :title="title" direction="rtl" size="50%">
      <el-card class="drawerCard">
        <!--        三个点-->
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
      <!-- 添加文章表单 -->
      <el-form :model="suppliersModel" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="suppliersModel.companyName" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="供应商姓名" prop="name">
          <el-input v-model="suppliersModel.name" placeholder="供应商姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="suppliersModel.phone" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="suppliersModel.address" placeholder="交易地址人"></el-input>
        </el-form-item>
        <el-form-item label="星级" prop="grade">
          <el-input v-model="suppliersModel.grade" placeholder="星级"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="suppliersModel.createTime" placeholder="创建时间" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-input v-model="suppliersModel.updateTime" placeholder="修改时间" disabled></el-input>
        </el-form-item>
        <!--        提交按钮-->
        <el-form-item>
          <el-button @click="title==='添加供应商'?supplierAdd():supplierUpdate()" id="accomplish">完成</el-button>
          <el-button @click="visibleDrawer=false">取消</el-button>
        </el-form-item>
      </el-form>
      </el-card>
    </el-drawer>
  </el-card>
</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  background-color: #F8FBFE;
  border-radius: 25px;
  z-index: 1;
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

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

// 暂时不用
/*// 标题背景卡片
.titleCard {
  width: 150px;
  height: 40px;
  font-size: 25px;
  text-align: center;
  background: #fff;
  border: 2px solid #000;
  border-radius: 0;
  font-family: font1, '微软雅黑',serif;
  box-shadow: 8px 8px 0 -2px #fff, 8px 8px 0 0 #000;
}*/

.demo-form-inline .el-input {
  --el-input-width: 220px;
}
// 抽屉标题文字的样式
:deep(.el-drawer__header){
  background-color: #eeefff;
  font-weight: 600;
  padding:0px 20px;
  height: 50px;
  color: #000000;
  margin-bottom: 0px;
}
:deep(.el-drawer__title) {
  font-size: 18px;
  font-family: font3, '宋体', serif;
}
:deep(.el-drawer) {
  background-color: #F8FBFE;
  border-top-left-radius: 15px; /* 设置左上角的弧度 */
  border-bottom-left-radius: 15px; /* 如果需要，也设置左下角的弧度 */
}
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
// 抽屉的卡片
.drawerCard{
  background-color: #F8FBFE;
  border-radius: 15px;
}
//搜索表单
.selectFrom{
  font-weight: bolder;
}
// 普通按钮样式
button {
  padding: 17px 40px;
  border-radius: 50px;
  cursor: pointer;
  border: 1px solid rgba(220, 226, 241);
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: #EEEFFF;
  font-size: 15px;
  transition: all 0.5s ease;
}
button:hover {
  letter-spacing: 3px;
  border: 0;
  background-color: hsl(84, 58%, 50%); /* 修改为新的 hsl 值 */
  color: hsl(0, 0%, 100%);
  box-shadow: #99CC33 0px 7px 29px 0px;
}
button:active {
  letter-spacing: 3px;
  background-color: hsl(84, 58%, 50%); /* 修改为新的 hsl 值 */
  color: hsl(0, 0%, 100%);
  box-shadow: none; /* 改为 none 以移除阴影 */
  transform: translateY(10px);
  transition: transform 100ms ease; /* 只对 transform 应用过渡 */
}
button:hover,
button:active {
  background-color: #99CC33; /* 直接使用十六进制颜色值 */
}
// 删除按钮样式
.deleteButton:hover,
.deleteButton:active {
  letter-spacing: 3px;
  border: 0;
  background-color: #ff605c; /* 使用颜色名称设置为红色 */
  color: hsl(0, 0%, 100%); /* 保持文本颜色为白色 */
  box-shadow: none; /* 移除阴影 */
}

.deleteButton:active {
  transform: translateY(10px);
  transition: transform 100ms ease; /* 只对 transform 应用过渡 */
}

// 更新按钮样式
.updateButton:hover,
.updateButton:active {
  letter-spacing: 3px;
  border: 0;
  background-color: #00ca4e; /* 使用颜色名称设置为红色 */
  color: hsl(0, 0%, 100%); /* 保持文本颜色为白色 */
  box-shadow: none; /* 移除阴影 */
}

.updateButton:active {
  transform: translateY(10px);
  transition: transform 100ms ease; /* 只对 transform 应用过渡 */
}
@font-face {
  font-family: 'font1'; /* 使用您的字体名称 */
  src: url('@/assets/font/FZWBJW.TTF') format('truetype'); /* 字体文件的路径 */
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'font3'; /* 使用您的字体名称 */
  src: url('@/assets/font/FZY1JW.TTF') format('truetype'); /* 字体文件的路径 */
  font-weight: normal;
  font-style: normal;
}
.el-table {
  //这行定义了一个CSS自定义属性--el-table-border-color，其值为transparent。这意味着表格的边框颜色将是透明的。
  --el-table-border-color: transparent;
  //这里似乎有一个错误。CSS自定义属性通常用于存储颜色、尺寸等可计算的值，
  // 而none通常用于border属性的值。因此，这行代码可能是无效的，
  // 或者可能是预期有其他地方的CSS引用这个属性，并进行了特殊处理。
  --el-table-border: none;
  //定义了一个自定义属性--el-table-text-color，表示表格中文本的颜色为#bdbdbe，这是一个浅灰色。
  //--el-table-text-color: #bdbdbe;
  //定义了表格头部文本的颜色也为#bdbdbe。
  --el-table-header-text-color: #333366;
  //当鼠标悬停在表格行上时，行的背景颜色将是透明的。
  --el-table-row-hover-bg-color: #eeefff;
  //当前选中或高亮显示的行的背景颜色将是透明的。
  //--el-table-current-row-bg-color: transparent;
  //表格头部的背景颜色将是透明的。
  --el-table-header-bg-color: transparent;
  //整个表格的背景颜色将是透明的。
  --el-table-bg-color: #F8FBFE;
  //表格的每一行（<tr>元素）的背景颜色将是透明的。
  --el-table-tr-bg-color: transparent;
  //当表格的某个单元格被展开时，这个展开部分的背景颜色将是透明的。
  //--el-table-expanded-cell-bg-color: transparent;
  --el-table-font-family: font1, '微软雅黑'; /* 定义字体样式 */
  --el-table-font-size: 18px; /* 定义字体大小 */
}
.el-table,
.el-table th,
.el-table td {
  color: var(--el-table-text-color); /* 应用文本颜色 */
  font-family: var(--el-table-font-family); /* 应用字体样式 */
  font-size: var(--el-table-font-size); /* 应用字体大小 */
  background-color: var(--el-table-bg-color); /* 应用表格的整体背景颜色 */
}
.el-table th {
  color: var(--el-table-header-text-color); /* 应用表头文本颜色 */
}

.el-table tr:hover {
  background-color: var(--el-table-row-hover-bg-color); /* 应用鼠标悬停时的行背景颜色 */
}

.el-table .current-row { /* 假设.current-row是当前行的类名 */
  background-color: var(--el-table-current-row-bg-color); /* 应用当前行的背景颜色 */
}
</style>
