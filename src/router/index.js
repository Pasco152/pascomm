import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        // 这里编写相应路由规则
        // 登录模块规则
        {
            path:"/login",
            component:login
        }
    ]
})

export default router