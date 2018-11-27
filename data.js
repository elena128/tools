import { isObject, isArray } from './format'
/**
 * 简单深拷贝
 */
export function simpleDeepCopy(obj) {
  if (!isObject(source)) return source;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 深拷贝(递归)
 */
export function clone(source) {
  if (!isObject(source)) return source;
  var target = {};
  for(var i in source) {
    if (source.hasOwnProperty(i)) {
      if (isObject(source[i])) {
        target[i] = clone(source[i]);
      } else {
        target[i] = source[i];
      }
    }
  }

  return target;
}

/**
 * 深拷贝(循环)
 */
export function cloneLoop(x) {
  const root = {};
  const loopList = [{parent: root, key: undefined, data: x}];

  while(loopList.length) {
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    for(let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

/**
 * 深拷贝(循环,保持引用关系)
 */
export function cloneForce(x) {
  const uniqueList = []
  let root = {}
  const loopList = [{parent: root, key: undefined, data: x}]

  while(loopList.length) {
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }
      
    let uniqueData = find(uniqueList, data);
    if (uniqueData) {
        parent[key] = uniqueData.target;
        continue;
    }

    // 保存源数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data,
      target: res,
    });
  
    for(let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

function find(arr, item) {
  for(let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }

  return null;
}

/**
 * 数组去重
 */
export function checkArrRepeat(arr = []) {
  return arr.filter(function (item, k, self) {
    return self.indexOf(item) === k;
  });
}

/**
 * 从一个数组里返回n个随机元素
 * deps: random
 */
export function getArrayItems(arr, num) {
  if (!isArray(arr)) return false
  if (num > arr.length) return false

  let returnArr = []
  for (let i = 0; i < num; i++) {
    const arrIndex = random(arr.length)
    returnArr[i] = arr[arrIndex]
    arr.splice(arrIndex, 1)
  }
  return returnArr
}

/**
 * 随机数
 */
export function random(max, min = 0) {
  const diff = max - min
  return Math.floor(Math.random() * diff) + min
}

/**
 * 产生唯一ID的函数
 * deps: S4
 */
export function getUid() {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

/**
 * 对象转数组
 */
export function getArrayByObject(obj) {
  let returnData = [];
  for (let i in obj) {
    if (obj[i]) returnData.push(i);
  }
  return returnData;
}

/**
 * 数组转对象
 */
export function getObjectByArray(arr, commonName, name) {
  let returnData = {};
  arr.map(item => {
    if (!returnData.hasOwnProperty(item[commonName])) returnData[item[commonName]] = [];
    if (name) returnData[item[commonName]].push(item[name]);
    else returnData[item[commonName]].push(item);
  });
  return returnData;
}

/**
 * 正则校验
 */
export function check(pattern, value) {
  var re = new RegExp(pattern);
  return !(pattern && !re.test(value));
}

/**
 * 隐藏内容(12**45)
 */
export function star (value) {
  if (!value) return false
  let str = value.toString()
  const len = str.length
  const rules = [{point: 6, end: 2}, {point: 9, start: 2, end: 2}, {point: 14, start: 3, end: 4}, {start: 4, end: 4, num: 8}]
  const rule = rules.find((item, k) => (len > (k === 0 ? 0 : rules[k - 1].point)) && (len <= item.point || item.point === undefined))
  const fixLen = len - ((rule.start || 0) + rule.end)
  return (rule.start ? str.substr(0, rule.start) : '') + '*'.repeat(fixLen < 0 ? 0 : rule.num ? rule.num : fixLen) + str.substr(-rule.end)
}

/**
 * 格式货币($125,646.000)
 */
export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  const stringified = Math.abs(value).toFixed(decimals)
  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  const i = _int.length % 3
  const head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : ''
  const _float = decimals ? stringified.slice(-1 - decimals) : ''
  const sign = value < 0 ? '-' : ''
  return sign + currency + head + _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,') + _float
}
