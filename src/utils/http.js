import axios from "axios";
import store from '../store/index';
import { Message, Loading } from 'element-ui';
import router from "../router/index";


let loading;        //定义loading变量
function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载数据中……',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.05)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}

const service = axios.create({
   // baseURL: window.location.protocol+"//"+window.location.host,
    baseURL: "/api/",//使用跨域
    timeout: 50000, // request timeout
    headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    },
    withCredentials: false
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        config.headers['Cache-Control'] = 'no-cache'; // ie清缓存，否则无法正常刷新
        config.headers['Pragma'] = 'no-cache'; // HTTP/1.1版本，ie清缓存，否则无法正常刷新
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        startLoading();
        return config;
    },
    error => {
        return Promise.error(error);
    });

// 响应拦截器
service.interceptors.response.use(
    response => {
        endLoading();
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        endLoading();
        let msg = "";
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    });
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    msg = "登录过期，请重新登录";
                    // 清除token
                    //localStorage.removeItem('token');
                    //store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    /*setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);*/
                    break;
                // 404请求不存在
                case 404:
                    msg = "网络请求不存在";
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    msg = "未知错误，请稍后重试";
            }
            Message.error(msg);
            return Promise.reject(error.response);
        }
    }
);

export default service