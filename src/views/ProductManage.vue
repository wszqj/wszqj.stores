<script setup>
import {
  Edit,
  Delete, Plus, Search, RefreshRight
} from '@element-plus/icons-vue'

import {ref} from 'vue'
import {
  deleteProductService, getProductInfoService,
  getStoresNameListService,
  getSupplierListService, productAddService,
  productsPageQueryService, productUpdateService
} from "@/api/product.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {useTokenStore} from "@/stores/token.js";

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数
const title = ref('')// 抽屉的状态
//控制抽屉是否显示
const visibleDrawer = ref(false)
// 定义搜索表单的数据模型
// 客户姓名
const name = ref('')
// 客户地址
const storeHouseId = ref('')
// 客户星级
const supplierId = ref('')

const stores = ref([
  {
    "id": 1,
    "name": '仓库1',
    "address": '河南省商丘市宁陵县',
    "capacity": '200平米',
    "state": '正常',
    "createTime": '2024-03-27 21:22:20',
    "updateTime": '2024-03-27 21:22:20'
  }
])
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
const products = ref([
  {
    "id": 1,
    "productPic": '',
    "name": "化妆台",
    "purchasingPrice": 99,
    "price": 199,
    "measure": '5x5',
    "unit": '个',
    "quantity": 100,
    "storeHouseId": 1,
    "supplier": 1,
    "createTime": '2024-3-16 14:57:00',
    "updateTime": '2024-3-16 14:57:00'
  }
])

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  productsList();
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  productsList();
}
//上传成功的回调函数
const uploadSuccess = (result) => {
  productsModel.value.productPic = result.data;
  console.log(result.data);
}
const tokenStore = useTokenStore();
// 定义客户数据模型
const productsModel = ref({
  id: '',
  productPic: '',
  name: '',
  purchasingPrice: '',
  price: '',
  measure: '',
  unit: '',
  quantity: '',
  storeHouseId: '',
  supplierId: '',
  createTime: '',
  updateTime: ''
})
// 清空数据模型
const clearProductsModel = () => {
  productsModel.value = {
    id: '',
    productPic: '',
    name: '',
    purchasingPrice: '',
    price: '',
    measure: '',
    unit: '',
    quantity: '',
    storeHouseId: '',
    supplierId: '',
    createTime: '',
    updateTime: ''
  }
}
//定义函数检查表单的数据是否输入完整
const checkProductDate = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入必要信息'))
  } else {
    callback()
  }
}
//定义函数检查价格的数据是否输入完整
const checkPriceOrQuantity = (rule, value, callback) => {
  if (value < 0) {
    callback(new Error('该数据必须大于0'))
  } else {
    callback()
  }
}
//定义校验规则
const rules = {
  productPic: [
    {required: true, message: '请输入仓库名称', trigger: 'blur'},
    {min: 2, max: 15, message: '长度为2~15位的非空字符', trigger: 'blur'},
    {validator: checkProductDate, trigger: 'blur'}
  ],
  name: [
    {required: true, message: '请输产品名', trigger: 'blur'},
    {min: 2, max: 15, message: '长度为2~15位的非空字符', trigger: 'blur'},
    {validator: checkProductDate, trigger: 'blur'}
  ],
  purchasingPrice: [
    {required: true, message: '请输入产品进价', trigger: 'blur'},
    {validator: checkPriceOrQuantity, trigger: 'blur'}
  ],
  price: [
    {required: true, message: '请输入产品售价', trigger: 'blur'},
    {validator: checkPriceOrQuantity, trigger: 'blur'}
  ],
  measure: [
    {required: true, message: '请输入产品规格', trigger: 'blur'},
    {min: 2, max: 10, message: '请输入2~10非空字符', trigger: 'blur'},
    {validator: checkProductDate, trigger: 'blur'}
  ],
  unit: [
    {required: true, message: '请输入产品计量单位', trigger: 'blur'},
    {min: 2, max: 10, message: '请输入2~10非空字符', trigger: 'blur'},
    {validator: checkProductDate, trigger: 'blur'}
  ],
  quantity: [
    {required: true, message: '请输产品库存', trigger: 'blur'},
    {validator: checkPriceOrQuantity, trigger: 'blur'}
  ],
  storeHouseId: [
    {required: true, message: '请选择所在仓库', trigger: 'blur'},
    {validator: checkProductDate, trigger: 'blur'}
  ],
  supplierId: [
    {required: true, message: '请选择供应商', trigger: 'blur'},
    {validator: checkProductDate, trigger: 'blur'}
  ],
}

// 获取仓库列表
const getStoresNameList = async () => {
  let result = await getStoresNameListService();
  stores.value = result.data;
}
getStoresNameList()
// 获取供应商列表
const getSupplierList = async () => {
  let result = await getSupplierListService();
  suppliers.value = result.data;
}
getSupplierList()
// 获取产品列表
const productsList = async () => {
  // 构造搜索参数
  const params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    name: name.value ? name.value : null,
    storeHouseId: storeHouseId.value ? storeHouseId.value : null,
    supplierId: supplierId.value ? supplierId.value : null
  }
  // 调用接口获取数据
  let result = await productsPageQueryService(params);
  // 渲染视图
  total.value = result.data.total;
  // 使用Vue提供的响应式API或者ref的value属性进行修改
  products.value = result.data.records;

  //获取产品仓库ID对应的仓库名称
  for (let i = 0; i < products.value.length; i++) {
    const product = products.value[i];
    for (let j = 0; j < stores.value.length; j++) {
      if (product.storeHouseId === stores.value[j].id) {
        product.storeHouseName = stores.value[j].name;
      }
    }
  }
  //获取产品对应的供应商姓名
  for (let i = 0; i < products.value.length; i++) {
    const product = products.value[i];
    for (let j = 0; j < suppliers.value.length; j++) {
      if (product.supplierId === suppliers.value[j].id) {
        product.supplierName = suppliers.value[j].name;
      }
    }
  }
}
productsList();

// 删除产品
// 删除仓库信息
const deleteStoreHouse = (row) => {
  ElMessageBox.confirm(
      '你确认要删除该产品吗?',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //调用接口
        let result = await deleteProductService(row.id);
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
        await productsList();
      })
}

// 获取产品详细信息
const getProductInfo = async (row) => {
  // 设置窗口状态
  title.value = '编辑货品';
  //设置抽屉显示
  visibleDrawer.value = true;
  //调用接口获取数据
  let result = await getProductInfoService(row.id);
  //渲染数据
  productsModel.value = result.data;
}

// 更新产品信息
const productUpdate = async () => {
  // 判断用户输入的信息是否合法(是否为空)
  const isFormValid = Object.values(productsModel.value).some(value => String(value).trim() !== '');
  if (!isFormValid) {
    ElMessage.error("订单信息不能为空");
    return; // 如果所有字段都为空或只包含空格，则显示错误信息并停止执行
  }
  //调用接口更新数据
  let result = await productUpdateService(productsModel.value);
  ElMessage.success(result.message ? result.message : '更新成功')
  // 清空数据模型
  clearProductsModel()
  //设置抽屉隐藏
  visibleDrawer.value = false
  // 刷新产品列表
  await productsList();
}
// 新增产品信息
const productAdd = async () => {
  // 判断用户输入的信息是否合法(是否为空)
  const isFormValid = Object.values(productsModel.value).some(value => String(value).trim() !== '');
  if (!isFormValid) {
    ElMessage.error("订单信息不能为空");
    return; // 如果所有字段都为空或只包含空格，则显示错误信息并停止执行
  }
  // 调用接口添加数据
  let result = await productAddService(productsModel.value);
  ElMessage.success(result.message ? result.message : '更新成功')
  // 清空数据模型
  clearProductsModel()
  // 设置抽屉隐藏
  visibleDrawer.value = false;
  //刷新列表
  await productsList();
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
<!--        <span class="card">货品管理</span>-->
        <div class="extra">
          <el-button @click="clearProductsModel(); title='添加商品'; visibleDrawer=true">
            <el-icon><Plus /></el-icon>
            <span>添加商品</span>
          </el-button>
        </div>
      </div>
    </template>

    <!--搜索表单-->
    <el-form inline class="selectFrom">
      <el-form-item label="商品名称：">
        <el-input v-model="name" placeholder="商品名称" clearable/>
      </el-form-item>
      <el-form-item label="所在仓库：">
        <el-select placeholder="请选择所在仓库" v-model="storeHouseId" style="width: 200px">
          <el-option
              v-for="c in stores"
              :key="c.id"
              :label="c.name"
              :value="c.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商：">
        <el-select placeholder="请选择供应商" v-model="supplierId" style="width: 200px">
          <el-option
              v-for="c in suppliers"
              :key="c.id"
              :label="c.name"
              :value="c.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="productsList()">
          <el-icon><Search /></el-icon>
          <span>搜索</span>
        </el-button>
        <el-button @click="name='';storeHouseId='';supplierId=''; productsList()">
          <el-icon><RefreshRight /></el-icon>
          <span>重置</span>
        </el-button>
      </el-form-item>
    </el-form>

    <!--数据展示区-->
    <el-table :data="products" style="width: 1430px">
      <el-table-column fixed prop="id" label="序号" type="index" width="150"/>
      <el-table-column label="商品样图">
        <template #default="{row}">
          <el-image :src="row.productPic" alt="商品样图" style="width: 100%; height: auto;"/>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称"/>
      <el-table-column prop="price" label="售价">
        <template #default="{row}">
          <span style="color: #ff605c">{{row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="measure" label="规格"/>
      <el-table-column prop="unit" label="计量单位"/>
      <el-table-column prop="storeHouseName" label="所在仓库"/>
      <el-table-column prop="createTime" label="进货时间" width="210"/>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{row}">
          <el-button :icon="Edit" class="updateButton" plain type="primary" @click="getProductInfo(row)" circle/>
          <el-button :icon="Delete" class="deleteButton" plain type="danger" @click="deleteStoreHouse(row)" circle/>
        </template>
      </el-table-column>
    </el-table>
<!--    分页-->
    <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5 ,10, 15]"
        layout="jumper, total, sizes, prev, pager, next"
        background
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin-top: 10px; justify-content: flex-end;"
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
      <el-form :model="productsModel" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="商品样图">
          <!--
          auto-upload：设置是否自动上传
          action：设置服务器的接口地址
          name：设置上传的文件的字段名
          header：设置上传的请求头
          on-success：设置上传成功的回调函数
          -->
          <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                     action="/api/upload"
                     name="file"
                     :headers="{'Authorization':tokenStore.token}"
                     :on-success="uploadSuccess">
            <img v-if="productsModel.productPic" :src="productsModel.productPic" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品名" prop="phone">
          <el-input v-model="productsModel.name" placeholder="商品名"></el-input>
        </el-form-item>
        <el-form-item label="商品进价" prop="address">
          <el-input v-model="productsModel.purchasingPrice" placeholder="商品进价"></el-input>
        </el-form-item>
        <el-form-item label="商品售价" prop="grade">
          <el-input v-model="productsModel.price" placeholder="商品售价"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="integration">
          <el-input v-model="productsModel.measure" placeholder="商品规格"></el-input>
        </el-form-item>
        <el-form-item label="计量单位">
          <el-input v-model="productsModel.unit" placeholder="计量单位"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="productsModel.quantity" placeholder="库存"></el-input>
        </el-form-item>
        <el-form-item label="所在仓库" prop="state">
          <el-select placeholder="请选择所在仓库" v-model="productsModel.storeHouseId">
            <el-option v-for="c in stores" :key="c.id" :label="c.name" :value="c.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" prop="state">
          <el-select placeholder="请选择供应商" v-model="productsModel.supplierId">
            <el-option v-for="c in suppliers" :key="c.id" :label="c.name" :value="c.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="productsModel.createTime" placeholder="创建时间" disabled></el-input>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-input v-model="productsModel.updateTime" placeholder="修改时间" disabled></el-input>
        </el-form-item>
        <!--        提交按钮-->
        <el-form-item>
          <el-button @click="title==='添加商品'?productAdd(): productUpdate()">完成</el-button>
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
/* 抽屉样式 */
.avatar-uploader {
  :deep {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
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
  font-family: font3, '宋体',serif;
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
