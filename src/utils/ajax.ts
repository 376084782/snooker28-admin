import router from "@/router";
import store from "@/store";
import axios from "axios";

let doAjax = axios.create({
  baseURL: 'http://localhost:9020/',
  // baseURL: 'http://39.101.162.107:9020/',
  // baseURL: 'http://212.129.234.189:9025/',
  headers: {}
});

doAjax.interceptors.request.use(config => {
  config.headers = {
    Authorization: 'Bearer ' + (store.state.token || 'token')
  }
  return config
})


doAjax.interceptors.response.use(res => {
  return new Promise((rsv, rej) => {
    //请求成功对响应数据做处理
    let dataServer = res.data
    if (dataServer.code == 0) {
      rsv(dataServer.data)  //该返回对象会传到请求方法的响应对象中
    } else if (dataServer.code == 401) {
      store.state.token = ''
      localStorage.setItem('token', '')
      router.replace({
        path: '/login'
      })
      rej(dataServer)
    } else {
      rej(dataServer)
    }
  })
}, (err) => {
  // 响应错误处理
  return Promise.reject(err);
})
export { doAjax }
