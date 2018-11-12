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
 * 联动
 */
const data1 = {
  'idA': { name: '一级A', data: { 'idA1': '二级A1', 'idA2': '二级A2', 'idA3': '二级A3', 'idA4': '二级A4' } },
  'idB': { name: '一级B', data: { 'idB1': '二级B1', 'idB2': '二级B2', 'idB3': '二级B3', 'idB4': '二级B4' } },
  'idC': { name: '一级C', data: { 'idC1': '二级C1', 'idC2': '二级C2', 'idC3': '二级C3', 'idC4': '二级C4' } },
  'idD': { name: '一级D', data: { 'idD1': '二级D1', 'idD2': '二级D2', 'idD3': '二级D3', 'idD4': '二级D4' } }
};
const data2 = {
  'idA1': { name: '二级A1', data: { 'idA11': '三级A11', 'idA12': '三级A12', 'idA13': '三级A13', 'idA14': '三级A14' } },
  'idA2': { name: '二级A2', data: { 'idA21': '三级A21', 'idA22': '二级A22', 'idA23': '二级A23', 'idA24': '二级A24' } },
  'idA3': { name: '二级A3', data: { 'idA31': '三级A31', 'idA32': '三级A32', 'idA33': '三级A33', 'idA34': '三级A34' } },
  'idA4': { name: '二级A4', data: { 'idA41': '三级A41', 'idA42': '三级A42', 'idA43': '三级A42', 'idA44': '三级A42' } },
  'idB1': { name: '二级B1', data: { 'idB11': '三级B11', 'idB12': '三级B12', 'idB13': '三级B13', 'idB14': '三级B14' } },
  'idB2': { name: '二级B2', data: { 'idB21': '三级B21', 'idB22': '二级B22', 'idB23': '二级B23', 'idB24': '二级B24' } },
  'idB3': { name: '二级B3', data: { 'idB31': '三级B31', 'idB32': '三级B32', 'idB33': '三级B33', 'idB34': '三级B34' } },
  'idB4': { name: '二级B4', data: { 'idB41': '三级B41', 'idB42': '三级B42', 'idB43': '三级B43', 'idB44': '三级B44' } },
  'idC1': { name: '二级C1', data: { 'idC11': '三级C11', 'idC12': '三级C12', 'idC13': '三级C13', 'idC14': '三级C14' } },
  'idC2': { name: '二级C2', data: { 'idC21': '三级C21', 'idC22': '二级C22', 'idC23': '二级C23', 'idC24': '二级C24' } },
  'idC3': { name: '二级C3', data: { 'idC31': '三级C31', 'idC32': '三级C32', 'idC33': '三级C33', 'idC34': '三级C34' } },
  'idC4': { name: '二级C4', data: { 'idC41': '三级C41', 'idC42': '三级C42', 'idC43': '三级C43', 'idC44': '三级C44' } },
  'idD1': { name: '二级D1', data: { 'idD11': '三级D11', 'idD12': '三级D12', 'idD13': '三级D13', 'idD14': '三级D14' } },
  'idD2': { name: '二级D2', data: { 'idD21': '三级D21', 'idD22': '二级D22', 'idD23': '二级D23', 'idD24': '二级D24' } },
  'idD3': { name: '二级D3', data: { 'idD31': '三级D31', 'idD32': '三级D32', 'idD33': '三级D33', 'idD34': '三级D34' } },
  'idD4': { name: '二级D4', data: { 'idD41': '三级D41', 'idD42': '三级D42', 'idD43': '三级D43', 'idD44': '三级D44' } }
};
console.log(data1, data2)
// var evalList = doT.template($("#list_template").text());
// level({ele:".level",data1:data1,level1:"idB",level2:"idB2",func:evalList})
export function linkage(ops) {
  var data0 = {};
  for (var i in ops.data1) {
    data0[i] = ops.data1[i].name
  }
  var list1 = { val: ops.level1, data: data0 };
  var list2 = { val: ops.level2, data: ops.data1[ops.level1 || Object.keys(list1.data)[0]].data };
  $(ops.ele + "1").html(ops.func(list1));
  $(ops.ele + "2").html(ops.func(list2));
  $(ops.ele + "1").change(function () {
    list2.data = ops.data1[$(this).val()].data;
    $(ops.ele + "2").html(ops.func(list2));
    if (ops.data2) {
      list3.data = ops.data2[Object.keys(list2.data)[0]].data;
      $(ops.ele + "3").html(ops.func(list3));
    }
  })
  if (ops.data2) {
    var list3 = { val: ops.level3, data: ops.data2[ops.level2 || Object.keys(list2.data)[0]].data };
    $(ops.ele + "3").html(ops.func(list3));
    $(ops.ele + "2").change(function () {
      list3.data = ops.data2[$(this).val()].data;
      $(ops.ele + "3").html(ops.func(list3));
    })
  }
}
