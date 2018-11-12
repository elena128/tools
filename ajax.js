import axios from 'axios'
import qs from 'qs'

let util = {}

util.ajax = axios.create({
  // headers: {'Content-Type': 'multipart/form-data'},
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  baseURL: '',
  timeout: 30000
})

util.post = (url, data) => {
  return axios.post(url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

util.ajax.defaults.transformResponse = (res) => {
  if (typeof res === 'string') {
    try {
      res = JSON.parse(res)
    } catch(e) {
      return '网络错误，请您稍后再试'
    }
  }
  switch (res.errorNo) {
    case 200:
      return res.data || {}
    default:
      return res.errorMsg
  }
}

util.ajax.defaults.validateStatus = (status) => {
  return (status >= 200 && status < 300) || (status >= 400)
}

util.ajax.interceptors.response.use(
  res => {
    if (util.ajax.defaults.validateStatus) {
      return res.data
    }
    return Promise.reject(res)
  },
  error => {
    return Promise.reject(error)
  }
)

util.ajax.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem('AUTH_TOKEN')) || ''
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  config.data = qs.stringify(config.data || {})
  return config
}, error => {
  return Promise.reject(error)
})

export default util
