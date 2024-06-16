import {createRouter, createWebHistory} from "vue-router";
//导入组件
import Login from "@/views/Login.vue";
import LayOutVue from "@/views/LayOut.vue";
import DataReportVue from "@/views/DataReport.vue";
import StoresVue from "@/views/StoreHouseManage.vue";
import CustomerManageVue from "@/views/CustomerManage.vue";
import OrderManageVue from "@/views/OrderManage.vue";
import PersonalCenterVue from "@/views/PersonalCenter.vue";
import SupplierManageVue from "@/views/SupplierManage.vue";
import ProductManageVue from "@/views/ProductManage.vue";
//定义路由关系
const routes = [
    {path: '/login', component: Login},
    {
        path: '/', component: LayOutVue, redirect: '/orders',
        children: [
            {path: '/dataReport', component: DataReportVue},
            {path: '/stores', component: StoresVue},
            {path: '/product', component: ProductManageVue},
            {path: '/customer', component: CustomerManageVue},
            {path: '/orders', component: OrderManageVue},
            {path: '/user/userInfo', component: PersonalCenterVue},
            {path: '/supplier', component: SupplierManageVue}
        ]
    },
    // 添加一个通配符路由，用于处理未定义的路径
    // 捕获所有未定义的路径并重定向到登录页
    { path: '/:catchAll(.*)', redirect: '/login' }
]
//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
//导出路由
export default router