//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//当前模块引入store
import store from "@/store";
//start：进度条开始
//done：进度条结束
//引入进度条的样式
import "nprogress/nprogress.css";
//利用axios对象的方法create，创建一个axios实例
//request就是axios，只不过可以配置一下
const requests=axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径当中出现api，
    baseURL:"/api",
    //请求超时时间5s
    timeout:5000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性很重要，header请求头
    //进度条开始
    nprogress.start();
    if(store.state.detail.uuid_token){
        //请求头添加一个字段（userTempId）
        config.headers.userTempId=store.state.detail.uuid_token
    }
    //判断需要携带token给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    return config;
});


//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功回调函数，服务器响应数据回来后，相应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    //响应失败回调函数
    return Promise.reject(new Error('faile'));
});


//对外暴露
export default requests;