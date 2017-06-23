import axios from 'axios'
import { Message } from 'element-ui'
// import store from '../store'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

// service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     // 根据情况改写此处的header,有可能是Authorization
//     config.headers['X-Token'] = store.getters.token
//   }
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

service.interceptors.response.use(response => response, err => {
  console.log('err' + err)
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(err)
})

export default service
