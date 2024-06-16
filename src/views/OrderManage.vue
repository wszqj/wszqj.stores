<script setup>
import {
  Edit,
  Delete, Search, RefreshRight, Sell, SoldOut, Plus
} from '@element-plus/icons-vue'

import {ref} from 'vue'
import {
  addOrderService,
  deleteOrderService,
  getOrderInfoServices,
  ordersPageQueryService,
  ordersTypeListService, updateOrderService
} from "@/api/orders.js";
import {ElMessage, ElMessageBox} from "element-plus";
import 'mdui/components/card.js';

const types = ref([
  {
    "id": 1,
    "typeName": "销售",
    "createTime": '2024-3-16 14:57:00',
    "updateTime": '2024-3-16 14:57:00'
  },
  {
    "id": 2,
    "typeName": "进货",
    "createTime": '2024-3-16 14:57:00',
    "updateTime": '2024-3-16 14:57:00'
  }
])
const orders = ref([
  {
    "id": 1,
    "business": '张三1',
    "businessPhone": '16666666666',
    "trader": '李四1',
    "traderPhone": '18888888888',
    "type": 1,
    "amountPaid": 9999,
    "actuallyPaid": 99,
    "comment": '顾客预定',
    "tradeTime": '2024-3-16 14:57:00',
    "updateTime": '2024-3-16 14:57:00'
  }
])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数
const title = ref('')// 抽屉的状态

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
  ordersList();
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  ordersList();
}

const ordersTypeList = async () => {
  let result = await ordersTypeListService();
  types.value = result.data;
}
ordersTypeList();

//用户搜索时的交易对象
const business = ref('')
//用户搜索时的交易人
const trader = ref('')
//用户搜索时的订单类型
const type = ref('')
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const orderModel = ref({
  business: '',
  businessPhone: '',
  trader: '',
  traderPhone: '',
  type: '',
  amountPaid: '',
  actuallyPaid: '',
  tradeTime: '',
  updateTime: '',
  comment: ''
})

// 订单的条件分页查询
const ordersList = async () => {
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    business: business.value ? business.value : null,
    trader: trader.value ? trader.value : null,
    type: type.value ? type.value : null
  }
  let result = await ordersPageQueryService(params);

  // 渲染视图
  total.value = result.data.total;
  // 使用Vue提供的响应式API或者ref的value属性进行修改
  orders.value = result.data.records;

  // 处理数据，给数据模型扩展一个属性ordersTypeName，分类的名称
  for (let i = 0; i < orders.value.length; i++) {
    let order = orders.value[i];
    for (let j = 0; j < types.value.length; j++) {
      if (order.type === types.value[j].id) {
        order.typeName = types.value[j].typeName;
      }
    }
  }
}
ordersList();

//删除订单数据
const deleteOrder = (row) => {
  ElMessageBox.confirm(
      '你确认要删除该订单吗?',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //调用接口
        let result = await deleteOrderService(row.id);
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
        await ordersList();
      })
}

// 新增订单
const orderAdd = async () => {
  // 判断用户输入的信息是否合法(是否为空)
  const isFormValid = Object.values(orderModel.value).some(value => String(value).trim() !== '');
  if (!isFormValid) {
    ElMessage.error("订单信息不能为空");
    return; // 如果所有字段都为空或只包含空格，则显示错误信息并停止执行
  }
  // 调用接口执行更新
  let result = await addOrderService(orderModel.value);
  // 输出返回请求信息
  ElMessage.success(result.message ? result.message : "添加成功");
  // 清空数据模型的数据
  clearOrderModel();
  // 设置抽屉的状态
  visibleDrawer.value = false;
  //刷新列表
  await ordersList()
}

//定义函数检查表单的数据是否输入完整
const checkOrderDate = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入必要信息'))
  } else {
    callback()
  }
}
// 获取订单详细信息
const orderInfo = async (row) => {
  //设置抽屉显示
  visibleDrawer.value = true;
  // 设置抽屉标题
  title.value = '编辑订单'
  //调用接口获取数据
  let result = await getOrderInfoServices(row.id);
  // 为数据模型赋值
  orderModel.value = result.data;
}

//更新订单信息
const updateOrder = async () => {
  // 判断用户输入的信息是否合法(是否为空)
  const isFormValid = Object.values(orderModel.value).some(value => String(value).trim() !== '');
  if (!isFormValid) {
    ElMessage.error("订单信息不能为空");
    return; // 如果所有字段都为空或只包含空格，则显示错误信息并停止执行
  }
  // 执行更新
  let result = await updateOrderService(orderModel.value);
  ElMessage.success(result.message ? result.message : '修改成功')
  //设置抽屉隐藏
  visibleDrawer.value = false
  // 清空数据模型
  clearOrderModel()
  // 刷新列表
  await ordersList()
}

//定义校验规则
const rules = {
  business: [
    {required: true, message: '请输入交易对象姓名', trigger: 'blur'},
    {min: 2, max: 10, message: '长度为2~10位的非空字符', trigger: 'blur'},
    {validator: checkOrderDate, trigger: 'blur'}
  ],
  businessPhone: [
    {required: true, message: '请输入交易对象联系方式', trigger: 'blur'},
    {min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'},
    {validator: checkOrderDate, trigger: 'blur'}
  ],
  trader: [
    {required: true, message: '请输入交易人姓名', trigger: 'blur'},
    {min: 2, max: 10, message: '请输入正确的手机号', trigger: 'blur'},
    {validator: checkOrderDate, trigger: 'blur'}
  ],
  traderPhone: [
    {required: false, message: '请输入交易人联系方式', trigger: 'blur'},
    {min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'},
  ],
  type: [
    {required: true, message: '请选择订单类型', trigger: 'blur'},
  ],
  amountPaid: [
    {required: true, message: '请输入应付金额', trigger: 'blur'},
    {min: 0, message: '应付金额不能小于0', trigger: 'blur'},
    {validator: checkOrderDate, trigger: 'blur'}
  ],
  actuallyPaid: [
    {required: true, message: '请输入实付金额', trigger: 'blur'},
    {min: 0, message: '应付金额不能小于0', trigger: 'blur'},
    {validator: checkOrderDate, trigger: 'blur'}
  ]
}

//清空数据模型数据
const clearOrderModel = () => {
  orderModel.value = {
    business: '',
    businessPhone: '',
    trader: '',
    traderPhone: '',
    type: '',
    amountPaid: '',
    actuallyPaid: '',
    tradeTime: '',
    updateTime: '',
    comment: ''
  }
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
        <!--        <span class="card">订单管理</span>-->
        <div>
          <el-button @click="clearOrderModel(); visibleDrawer=true; title='添加订单'">
            <el-icon><Plus /></el-icon>
            <span>添加订单</span>
          </el-button>
        </div>
      </div>
    </template>

    <!-- 搜索表单 -->
    <el-form inline class="selectFrom">
      <el-form-item label="交易对象：">
        <el-input v-model="business" placeholder="请输入交易对象" clearable/>
      </el-form-item>
      <el-form-item label="交易人：">
        <el-input v-model="trader" placeholder="请输入交易人" clearable/>
      </el-form-item>
      <el-form-item label="订单类型：">
        <el-select placeholder="请选择文章分类" v-model="type" style="width: 200px">
          <el-option
              v-for="c in types"
              :key="c.id"
              :label="c.typeName"
              :value="c.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="ordersList()">
          <el-icon>
            <Search/>
          </el-icon>
          <span>搜索</span>
        </el-button>
        <el-button @click="business='';trader='';type=''; ordersList()">
          <el-icon>
            <RefreshRight/>
          </el-icon>
          <span>重置</span>
        </el-button>
      </el-form-item>
    </el-form>

    <!--    数据展示区域-->
    <el-table :data="orders" style="width: 1430px">
      <el-table-column prop="id" label="序号" type="index" width="150"/>
      <el-table-column prop="business" label="交易对象" width="150"/>
      <el-table-column prop="businessPhone" label="联系方式"/>
      <el-table-column prop="trader" label="交易人" width="150"/>
      <el-table-column prop="typeName" label="交易类型">
        <template #default="{row}">
         <span v-if="row.typeName==='销售'">
           <el-icon color="#009966"><Sell /></el-icon>
           <span style="color: #00ca4e; font-family:  font2, '微软雅黑',serif">{{row.typeName}}</span>
         </span>
         <span v-else>
           <el-icon color="#FF6666"><SoldOut /></el-icon>
           <span style="color: #ff605c; font-family:  font2, '微软雅黑',serif">{{row.typeName}}</span>
         </span>
        </template>
      </el-table-column>
      <el-table-column prop="amountPaid" label="应付金额（元）">
        <template #default="{row}">
          <span style="color: #ff605c;">{{ row.amountPaid }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tradeTime" label="交易时间"/>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button :icon="Edit" class="updateButton" plain type="primary" @click="orderInfo(row)" circle/>
          <el-button :icon="Delete" class="deleteButton" plain type="danger" @click="deleteOrder(row)" circle/>
        </template>
      </el-table-column>
      <el-button link type="primary" size="small">Edit</el-button>
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
        style="margin-top: 10px; justify-content: flex-end"
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
      <el-form :model="orderModel" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="交易对象" prop="business">
          <el-input v-model="orderModel.business" placeholder="交易对象"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="businessPhone">
          <el-input v-model="orderModel.businessPhone" placeholder="交易对象联系方式"></el-input>
        </el-form-item>
        <el-form-item label="交易人" prop="trader">
          <el-input v-model="orderModel.trader" placeholder="交易人"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="traderPhone">
          <el-input v-model="orderModel.traderPhone" placeholder="交易人联系方式"></el-input>
        </el-form-item>
        <el-form-item label="应付金额" prop="amountPaid">
          <el-input v-model="orderModel.amountPaid" placeholder="应付金额（元）"></el-input>
        </el-form-item>
        <el-form-item label="实付金额" prop="actuallyPaid">
          <el-input v-model="orderModel.actuallyPaid" placeholder="实付金额（元）"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="orderModel.comment" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item label="交易类型" prop="type">
          <el-select placeholder="请选择" v-model="orderModel.type">
            <el-option v-for="c in types" :key="c.id" :label="c.typeName" :value="c.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单交易时间">
          <el-input v-model="orderModel.tradeTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单修改时间">
          <el-input v-model="orderModel.updateTime" disabled></el-input>
        </el-form-item>
        <!--        提交按钮-->
        <el-form-item>
          <el-button @click="title==='添加订单'?orderAdd():updateOrder()">完成</el-button>
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
  font-family: 'font2'; /* 使用您的字体名称 */
  src: url('@/assets/font/FZKTJW.TTF') format('truetype'); /* 字体文件的路径 */
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
