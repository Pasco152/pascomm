import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
import login from '@/views/login/login.vue'
const router = new VueRouter({
    routes: [
        // 这里编写相应路由规则
        // 登录模块规则
        {
            path:"/login",
            component:login
        },
        {
            path:"/",
            component:login
        }
    ]
})

export default router