import axios from 'axios'  // 导入axios

const instance = axios.create({  // 创建instance
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie   由于现在最新版浏览器处于安全考虑,设置也不会起效
    withCredentials: true
})

export function userLogin(data) {  // 把接口暴露出去,通过instance调用即可
    return instance({
        url:'/login',
        method:'post',
        // data:data
        data
    })
}
