import './assets/main.scss'
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "@/router/index.js";
import {createPinia} from "pinia";
import {createPersistedState} from "pinia-persistedstate-plugin";
import locale from 'element-plus/dist/locale/zh-cn.js'
import 'echarts';

const app = createApp(App)
const pinia = createPinia();
let persist = createPersistedState();
// 在应用启动时导航到登录页面
router.beforeEach((to, from, next) => {
    if (to.path === '/') { // 如果访问的是根路径
        next('/login'); // 重定向到登录页面
    } else {
        next(); // 否则继续正常导航
    }
});
pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {locale})
app.mount('#app')