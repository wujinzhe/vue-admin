import _axios from 'axios'
import Vue from 'vue'

// 基本参数
let options = {
  baseURL: '/api/mbp/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
}

// 根据配置创建axios
let axios = _axios.create(options)

// let interceptorsError = null // 拦截器错误

// http request 请求拦截器
axios.interceptors.request.use(
  request => {
    return request
  },
  err => {
    console.error('[error][request拦截错误]', err.message)
    return Promise.reject(new Error('服务器请求错误'))
  }
)

// http response 请求拦截器
axios.interceptors.response.use(
  response => {
    // _config.response.handle(config)
    return response
  },
  err => {
    // _config.response.err(err)
    let status = err.response.status || ''
    return Promise.reject(new Error(err.response.data.errorInfo || `【${status}】服务器响应错误`))
  }
)

function request (method, url, data, config) {
  // 所需请求的参数
  let _data = {
    params: {
      ...data
    }
  }

  // 根据请求方式将请求参数放在不同的地方
  let _config = { ...config }
  if (method.toUpperCase() === 'GET') {
    _config.params = _data
  } else {
    _config.data = _data
  }

  return axios({
    method,
    url,
    ..._config
  }).then(resp => {
    // 判断条件是否符合
    if (resp.data.returnCode === '0') {
      return resp.data
    } else if (resp.data.errorNo === '1006') {
      // 登录状态失效，跳转登录
      return new Promise((resolve, reject) => {}) // 返回一个永远不响应的promise
    }

    throw new Error(resp.data.errorInfo || '服务器异常，请重试') // 因为只有throw才会抛到下面的catch中
  }).catch(err => {
    console.error('[error][盒伙人运管 网络请求错误]', err.message)
    Vue.prototype.$message.error(err.message)
    throw err
  })
}
let axiosInstance = {}
let methodList = ['post', 'get', 'delete', 'put']
methodList.forEach(method => {
  axiosInstance[method] = (url, data, config = {}) => request(method, url, data, config)
})

export default axiosInstance
