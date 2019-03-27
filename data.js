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
  for (var i in source) {
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
  const loopList = [{ parent: root, key: undefined, data: x }];

  while (loopList.length) {
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    for (let k in data) {
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
  const loopList = [{ parent: root, key: undefined, data: x }]

  while (loopList.length) {
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

    for (let k in data) {
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
  for (let i = 0; i < arr.length; i++) {
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
export function star(value) {
  if (!value) return false
  let str = value.toString()
  const len = str.length
  const rules = [{ point: 6, end: 2 }, { point: 9, start: 2, end: 2 }, { point: 14, start: 3, end: 4 }, { start: 4, end: 4, num: 8 }]
  const rule = rules.find((item, k) => (len > (k === 0 ? 0 : rules[k - 1].point)) && (len <= item.point || item.point === undefined))
  const fixLen = len - ((rule.start || 0) + rule.end)
  return (rule.start ? str.substr(0, rule.start) : '') + '*'.repeat(fixLen < 0 ? 0 : rule.num ? rule.num : fixLen) + str.substr(-rule.end)
}

/**
 * 格式货币($125,646.000)
 */
export function currency(value, currency, decimals) {
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



// 闭包(closure): 能够读取其他函数内部变量的函数。在javascript中，只有函数内部的子函数才能读取局部变量，所以闭包就是“定义在函数内部的函数”。函数和声明该函数的词法环境的组合

  // 关键字：局部变量、要执行的代码块、作用域

  // 作用：是将函数内部和外部联系起来的桥梁。

  // javascript回收机制：在javascript中，如果一个对象不再被引用，那么这个对象就会被GC回收。如果两个对象互相引用，而不再被第3者所引用，那么这两个对象也会被回收。
  // 闭包的解释：
    // a执行完并返回后，闭包使得javascript的垃圾回收机制不会回收a所占的资源，因为a的内部函数b的执行需要依赖a中的变量
    // a返回函数b的引用给c，又函数b的作用域链包含了对函数a的活动对象的引用，也就是说b可以访问到a中定义的所有变量和函数。函数b被c引用，函数b又依赖函数a，因此函数a在返回后不会被垃圾回收机制回收。
  
  // 实现：
    // 立即执行函数
      function a() {
        console.log('在这里会出现几次呀')
        let isFirst = true
        let value = 0
        function b() {
          if (isFirst) {
            console.log('只在第一次出现')
            isFirst = false
            value = 2
            return value
          }
          return value
        }
        return b
      }
      let c = a()
      c()

    // 对象/类中的函数(改变或定义对象中的属性值并保持)
      let a = {
        value: 0,
        b() {
          if (!this.exist) {
            console.log('只在第一次出现')
            this.exist = true
            this.value = 2
            return this.value
          }
          return this.value
        }  // 同上面的c
      }
      a.value
      a.b()
      a.b()
      a.value
  
    // 注意：变量的作用域
      // error
      for (var i = 0; i < 5; i++) {
        setTimeout(function(){
          console.log(i)
        }, 0)
      }
      // right
      for (var i = 0; i < 5; i++) {
        (function (i) {
          setTimeout(function(){
            console.log(i)
          }, 0)
        }(i))
      }
      // let关键字
// 使用场景：保护函数内的变量安全、在内存中维持一个变量
    // 1 通过闭包做函数数据缓存
      var mult = (function () {
        var cache = {};
        var calculate = function () {
          var a = 1;
          for (var i = 0, len = arguments.length; i < len; i++) {
            a = a * arguments[i];
          }
          return a;
        }

        return function () {
          var args = Array.prototype.join.call(arguments, ',');

          if (args in cache) {
            return cache[args];
          }

          return cache[args] = calculate.apply(null, arguments);
        }
      }())
      mult(number, number)

    // 2 延续局部变量的寿命（放到内存里）
      var report = (function () {
        var imgs = [];
        return function (src) {
          var img = new Image();
          imgs.push(img);
          img.src = src;
        }
      }())
      report('img url');

// 对象=数据+方法，而闭包是在过程中以环境的形式包含了数据，因此通常面向对象能实现的功能，使用闭包也可以实现。

// 注意：
  // 1、由于闭包会使得函数中的变量都被保存在内存中，内存消耗大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄漏。解决方式是再退出函数之前，将不使用的局部变量全部删掉。
  // 2、闭包会在父函数外部，改变父函数内部变量的值。所以，如果把父函数当作对象使用，把闭包当作它的公用方法，把内部变量当作它的私有属性，这时要小心不要随便改变父函数内部变量的值。

// 小测试：
var max = 10,
fn = function(x) {
  if (x > max) {
    console.log(x)
  }
}
(function(f) {
  var max = 100
  f(15)
})(fn)

