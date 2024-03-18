import {createRouter, createWebHistory} from "vue-router";

//导入组件
import LayOutVue from "@/views/LayOut.vue";
import ClientsVue from "@/views/DataReport/Client.vue";
import GoodsPriceVue from "@/views/DataReport/GoodsPrice.vue";
import SellVue from "@/views/DataReport/Sell.vue";
import StockWithGoodsVue from "@/views/DataReport/StockWithGoods.vue";
import StoresVue from "@/views/StoresManage/Stores.vue";
import StoresDetailsVue from "@/views/StoresManage/StoresDetails.vue";
import ClientManageVue from "@/views/ClientManage.vue";
import SaleOrderManageVue from "@/views/SaleOrderManage.vue";
import SellOrderManageVue from "@/views/SellOrderManage.vue";
import PersonalCenterVue from "@/views/PersonalCenter.vue";
import SupplierManageVue from "@/views/SupplierManage.vue";

//定义路由关系
const routes = [
    {path: '/LayOut', component: LayOutVue},
    {
        path: '/', component: LayOutVue, redirect: '/dataReport/goodsPrice',
        //配置子路由
        children: [
            {path: '/dataReport/clients', component: ClientsVue},
            {path: '/dataReport/goodsPrice', component: GoodsPriceVue},
            {path: '/dataReport/sell', component: SellVue},
            {path: '/dataReport/stockWithGoods', component: StockWithGoodsVue},
            {path: '/storesManage/stores', component: StoresVue},
            {path: '/storesManage/storesDetails', component: StoresDetailsVue},
            {path: '/common/clientManage', component: ClientManageVue},
            {path: '/common/sellOrderManage', component: SellOrderManageVue},
            {path: '/common/saleOrderManage', component: SaleOrderManageVue},
            {path: '/common/PersonalCenter', component: PersonalCenterVue},
            {path: '/common/SupplierManage', component: SupplierManageVue}
        ]
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router