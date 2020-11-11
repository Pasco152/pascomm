import axios from 'axios'  // 导入axios

const instance = axios.create({  // 创建instance
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie   由于现在最新版浏览器处于安全考虑,设置也不会起效
    withCredentials: true
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    window.console.log(config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    console.log('响应拦截器')
    console.log(response)
    // 可以对响应的值进行一些处理
    // return response;
    return response.data
}, function (error) {
    // 可以在这里对错误进行一些处理
    return Promise.reject(error);
});

export function userLogin(data) {  // 把接口暴露出去,通过instance调用即可
    return instance({
        url:'/login',
        method:'post',
        // data:data
        data
    })
}
