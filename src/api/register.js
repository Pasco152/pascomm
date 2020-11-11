import axios from 'axios'  // 导入axios
import {Message} from 'element-ui'

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
    // console.log('响应拦截器')
    // console.log(response)
    window.console.log("响应的数据拦截",response)
    // 可以对响应的值进行一些处理
    if (response.data.code == 200) {
        return response.data 
    } else {
        Message.error(response.data.message)
        return response.data
    }
    // return response;
}, function (error) {
    // 可以在这里对错误进行一些处理
    return Promise.reject(error);
});

 function userSendsms(data) {  
    return instance({
        url: '/sendsms',
        method: 'post',
        // data:data
        data
    })
}
 function userRegister(data) {  
    return instance({
        url: '/register',
        method: 'post',
        // data:data
        data
    })
}

export{userSendsms,userRegister}  // 把接口暴露出去,通过instance调用即可
