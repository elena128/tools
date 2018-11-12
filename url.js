import { str2Obj } from './format'
/**
 * 获取url参数
 * deps: str2Obj
 */
export function getQuery(name) {
  const query = window.location.search
  const param = query && query.substr(1)
  if (!name) return param || null
  const obj = str2Obj(param)
  return obj && obj[name] || null
}

/**
 * 替换url中某个参数值
 * deps: getQuery str2Obj
 */
export function updateParam(key, value = null) {
  if (!key) return false
  const param = getQuery()
  let paramObj = str2Obj(param)
  return {...paramObj, [key]: value}
}

// window对象
// window.location.href 整个URl字符串(在浏览器中就是完整的地址栏)
// 返回值：http://www.home.com:8080/windows/location/page.html?ver=1.0&id=timlq#love 

// window.location.protocol URL的协议部分
// 返回值：http:

// window.location.host URL的主机部分，
// 返回值：www.home.com

// window.location.port URL的端口部分。如果采用默认的80端口(update:即使添加了:80)，那么返回值并不是默认的80而是空字符。
// 返回值:8080

// window.location.pathname URL的路径部分(就是文件地址)
// 返回值：/windows/location/page.html

// window.location.search 查询(参数)部分。除了给动态语言赋值以外，我们同样可以给静态页面,并使用javascript来获得相信应的参数值
// 返回值：?ver=1.0&id=timlq

// window.location.hash 锚点
// 返回值：#love

// 返回并刷新
// self.location=document.referrer;
