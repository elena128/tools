/**
 * pc端拖动图片选择文件
 **/
export function initDrag(element) {
  let target = document.querySelector(element)
  target.addEventListener('dragover', function (e) {
    e.preventDefault()
    target.className = 'active'
  }, true)
  target.addEventListener('drop', function (e) {
    e.preventDefault()
    target.className = ''
    console.log(e.dataTransfer.files[0])
  }, true)
}

/**
 * 拖拽效果
 **/
export function drag(ele) {
  let mouseDownX, mouseDownY, initX, initY, flag = false
  ele.onmousedown = function(e) {
    mouseDownX = e.pageX
    mouseDownY = e.pageY
    initX = obj.offsetLeft
    initY = obj.offsetTop
    flag = true
  }
  ele.onmousemove = function(e) {
    if(flag) {
      var mouseMoveX = e.pageX,mouseMoveY = e.pageY
      this.style.left = parseInt(mouseMoveX) - parseInt(mouseDownX) + parseInt(initX) + "px"
      this.style.top = parseInt(mouseMoveY) - parseInt(mouseDownY) + parseInt(initY) + "px"
    }
  }  
  ele.onmouseup = function() {
    flag = false
  }
}

/**
 * 判断设备
 **/
export function getVersions() {
  var u = navigator.userAgent
  var mobile = !!u.match(/AppleWebKit.*Mobile.*/)
  if (mobile) {
    var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    var android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var weixin = u.indexOf('MicroMessenger') > -1
    var qq = u.match(/\sQQ/i) == ' qq'
    if (ios) return 1
    if (android) return 2
    if (weixin) return 3
    if (qq) return 4
  } else return 0
}
// var ua = navigator.userAgent.toLowerCase();
// /mobi|android|touch|mini/i.test(ua)

/**
 * 兼容各个浏览器的原生事件监听
 **/
export function addEvent(el, type, callback) {
  let eType = type === 'mousewheel' && document.mozFullScreen !== undefined ? 'DOMMouseScroll' : type
  eType = window.addEventListener ? eType : 'on' + eType
  const eventFuc = window.addEventListener ? 'addEventListener' : 'attachEvent'
  el[eventFuc](eType, function(event) {
    if (type === 'mousewheel') event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    event.preventDefault()
    callback(event)
  })
}

/**
 * 兼容各个浏览器的原生事件移除
 **/
export function removeEvent(el, type) {
  let eType = type === 'mousewheel' && document.mozFullScreen !== undefined ? 'DOMMouseScroll' : type
  eType = window.addEventListener ? eType : 'on' + eType
  const eventFuc = window.removeEventListener ? 'removeEventListener' : 'detachEvent'
  el[eventFuc](eType, function() {})
}

export const EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent(on + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },

  getEvent: function (event) {
    return event ? event : window.event;
  },

  getTarget: function (event) {
    return event.target || event.srcElement;
  },

  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent(on + type, handler);
    } else {
      element['on' + type] = null
    }
  }
}

/**
 * 判断IE10以下
 **/
export function isIE() {
  return ((!!window.ActiveXObject || 'ActiveXObject' in window) && (document.documentMode < 10))
}

/**
 * 浏览器是否支持html5
 **/
export function supportHtml5() {
  return !!document.createElement('canvas').getContext
}

/**
 * 屏幕旋转的事件和样式
 **/
export function getOrientation() {
  window.onorientationchange = () => {
    switch(window.orientation){
      case -90:
      case 90:
        return '横屏:' + window.orientation
      case 0:
      case 180:
        return '竖屏:' + window.orientation
    }
  }
}

/**
 * event.js
 **/
export function event() {
  var isTouch = false;
  var isDoubleTouch = false;   
  var start = [];
  var now, delta; //当前时间，两次触发事件时间差
  var startPosition, movePosition, endPosition;
  var gesturestart = new CustomEvent('gesturestart');
  var gesturechange = new CustomEvent('gesturechange');
  var gestureend = new CustomEvent('gestureend');
  var swipeMove = new CustomEvent('swipeMove');
  var doubleTouch = new CustomEvent("doubleTouch");

  document.addEventListener('touchstart', function(e) {
    if (e.touches.length >= 2) {
      isDoubleTouch = true;
      start = e.touches;
      var screenMinPoint = getMidpoint(start[0], start[1]);
      gesturestart.midPoint = [screenMinPoint[0] - e.target.offsetLeft, screenMinPoint[1] - e.target.offsetTop]; //中心点坐标相对目标元素坐标
      e.target.dispatchEvent(gesturestart);
    } else {
      delta = Date.now() - now;
      now = Date.now();
      startPosition = [e.touches[0].pageX, e.touches[0].pageY];
      if (delta > 0 && delta <= 250) { //双击事件
        doubleTouch.position = [e.touches[0].pageX - e.target.offsetLeft, e.touches[0].pageY - e.target.offsetTop];
        e.target.dispatchEvent(doubleTouch);
      } else { //滑动事件
        isTouch = true;
      }
    }
  }, false);

  document.addEventListener('touchmove', function(e) {
    if (e.touches.length >= 2 && isDoubleTouch) {
      var now = e.touches;
      var scale = getDistance(now[0], now[1]) / getDistance(start[0], start[1]); //得到缩放比例
      var rotation = getAngle(now[0], now[1]) - getAngle(start[0], start[1]); //得到旋转角度差
      gesturechange.scale = scale.toFixed(2);
      gesturechange.rotation = rotation.toFixed(2);
      e.target.dispatchEvent(gesturechange);
    } else if (isTouch) {
      movePosition = [e.touches[0].pageX, e.touches[0].pageY];
      endPosition = movePosition;
      movePosition = [movePosition[0] - startPosition[0], movePosition[1] - startPosition[1]];
      startPosition = [e.touches[0].pageX, e.touches[0].pageY];
      swipeMove.distance =[movePosition[0].toFixed(2) , movePosition[1].toFixed(2)];
      e.target.dispatchEvent(swipeMove);
    }
  }, false);

  document.addEventListener('touchend', function(e) {
    if (isDoubleTouch) {
      isDoubleTouch = false;
      gestureend.position = endPosition;
      e.target.dispatchEvent(gestureend);
    };
  }, false);

  function getDistance(p1, p2) {
    var x = p2.pageX - p1.pageX,
        y = p2.pageY - p1.pageY;
    return Math.sqrt((x * x) + (y * y));
  };

  function getAngle(p1, p2) {
    var x = p1.pageX - p2.pageX,
        y = p1.pageY - p2.pageY;
    return Math.atan2(y, x) * 180 / Math.PI;
  };

  function getMidpoint(p1, p2) {
    var x = (p1.pageX + p2.pageX) / 2,
        y = (p1.pageY + p2.pageY) / 2;
    return [x, y];
  }
}

/**
 * 字符串滚动
 **/
var str = '欢迎你能够来学习 JavaScript是一门脚本语言'
function strLeft() {
  str = str + str.substring(0, 1)
  str = str.substring(1, str.length)
  console.log(str)
}
setInterval(strLeft, 300)

/**
 * 模版加载数据
 **/
// <script id="pro" type="text/template"></script>
String.prototype.tmp = function (obj) {
  return this.replace(/\$\w+\$/g, function (matchs) {
    var returns = obj[matchs.replace(/\$/g, '')];
    return (returns + '') == 'undefined' ? '' : returns;
  });
};
export function gethtml(data, template) {
  var htmlList = '',
    htmlTemp = $(template).html();
  data.forEach(function (object) {
    htmlList += htmlTemp.tmp(object);
  });
  return htmlList;
}

/**
 * doT模版
 **/
// <script type="text/template" charset="utf-8" id='city_template'>
//   {{for(var i in it){ }}
//   <div class="item">{{=it}}</div>
//   {{ } }}
// </script>
// var evalArea = doT.template(documentHtml);
// evalArea(data)

// 百度地图接口
//http://api.map.baidu.com/geocoder?address=''&output=html
// 获取电脑IP
// http://pv.sohu.com/cityjson?ie=utf-8


// 事件的本质是程序各个组成部分之间的一种通信方式，也是异步编程的体现。
// 浏览器的事件模型就是通过监听函数对事件作出反应，事件发生后浏览器监听到了这个事件，就会执行对应的监听函数，这就是事件驱动编程模式

// DOM 事件类型：鼠标事件 键盘事件 进度事件 表单事件 触摸事件 拖拽事件 资源事件(beforeunload, load) session历史事件 网页状态事件 窗口事件 剪贴板事件 焦点事件

// Event————————————|——UIEvent——|——FocusEvent
// EventTarget      |           |——MouseEvent---WheelEvent
// EventListener    |           |——TextEvent
// DocumentEvent    |           |——KeyboardEvent
//                  |           |——CompositionEvent
//                  |——CustomEvent
//                  |——MutationEvent

// ￣——__

// Window document html body element 捕获、冒泡
// 事件传播：捕获阶段 目标阶段 冒泡阶段
// 事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间，可以用侦听器来预定事件，以便事件发生时执行相应的代码
// addEventListener removeEventListener


export function triangle(n) {
  let arr = []
  for (let index = 0; index < n; index++) {
    arr[index] = []
    for (let k = 0; k < index + 1; k++) {
      const n = k > 0 ? (arr[index][k - 1]+ arr[index - 1][k - 1]) : 1
      arr[index].push(n)
    }
    console.log(arr[index].join(' '))
  }
}

// 从输入url到出现页面涉及的主要流程或步骤有：
// ①浏览器根据请求的URL，交给DNS域名解析，找到真实的ip。
// ②服务器交给后端处理完成后返回的数据，浏览器接收文件HTML,CSS,JS图片等。
// ③浏览器对加载的资源进行语法解析，建立相应的数据内部结构。
// ④解析html，创建dom树，自上而下的顺序
// ⑤解析css，优先级：浏览器默认设置<用户设置<外部样式<内联样式<HTML中的style样式；
// ⑥将css与dom合并，构建渲染树
// ⑦布局重绘重排，页面完成渲染。


var xhr = new XMlHttpRequest()
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText)
    } else {
      console.error(xhr.statusText)
    }
  }
}

xhr.onerror = function() {
  console.error(xhr.statusText)
}
xhr.open('GET', '/request', true)
xhr.send(null)

// 跨域解决：jsonp(get), WebSocket, CORS(Cross-Origin Resource Sharing)

// History: back, forward, go, pushState, replaceState
// Location: href, protocol, host, hostname, port, pathname, search, hash, username, password, origin assign, replace, reload
// URL的编码和解码：encodeURI, encodeURIComponent, decodeURI, decodeURIComponent
// URL methods: createObjectURI, revokeObjectURI, searchParams

// const url = new URL(location.href);
// url.searchParams.get('type')

// URLSearchParams: append, delete, has, set, get, getAll, sort, keys, values, entires

// Blob对象表示一个二进制文件的数据内容，比如一个图片的内容就可以通过Blob对象读写。它通常用来读写文件，它的名字是Binary Large Object（二进制大型对象）的缩写。它与ArrayBuffer的区别在于，它用于操作二进制文件， 而ArrayBuffer用于操作内存。
// 取得Blob对象后可以通过FileReader对象读取Blob对象的内容，即文件内容
// FileReader: readAsText, readAsArrayBuffer, readAsDataURL, readAsBinaryString

// File对象代表一个文件，用来读取文件信息，它继承了Blob对象，或者说是一种特殊的Blob对象，所有可以使用Blob对象的场合都可以使用它

// formData: get, getAll, set, delete, append, has, keys, values, entries

// 构造函数: 内部的this代表新生成的实例对象
// new命令的作用就是执行构造函数，返回一个实例 无构造函数时，创建实例对象 Object.create(obj)
// new原理：
// 1.创建一个空对象，作为讲要返回的对象实例 2.将这个空对象的原型指向构造函数的prototype属性
// 3.将这个空对象赋值给函数内部的this关键字 4.开始执行构造函数内部代码

// this: 总是返回一个对象，它就是属性或方法"当前"所在的对象

// 单线程、异步、非阻塞、解释性

// javascript单线程指的是浏览器中负责解释和执行javascript代码的只有一个线程，即为js引擎线程，但浏览器的渲染进程是提供多个线程的，如：js引擎线程，事件触发线程，定时触发器线程，异步http请求线程，GUI渲染线程
// 事件循环(event loop)与消息队列, 事件循环机制和消息队列的维护是由事件触发线程控制的
// 消息队列和执行栈
// 宏任务执行完，立即执行当前微任务队列中的微任务


// options split-panel multiple show-week-numbers start-date confirm open size disabled clearable readonly editable transfer

// options: shortcuts disabledDate

// on-change on-open-change on-ok on-clear


// 跑马灯
function checkScrollLeft(){
  if (boxWidth > textWidth) return false
  content.innerHTML += content.innerHTML
  document.querySelector('.text').classList.add('padding')
  textWidth = document.querySelector('.text').offsetWidth
  toScrollLeft()
}

function toScrollLeft(){
  if (textWidth > box.scrollLeft) {
    box.scrollLeft++
  } else {
    box.scrollLeft = 0
  }
  setTimeout('toScrollLeft()', 18);
}
checkScrollLeft()

// npm install -g cnpm --registry=https://registry.npm.taobao.org

/**
 * 防抖
 * 
 * @param {function} fn 
 */
function debounce(fn) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments);
    }, 500);
  };
}
function sayHi() {
  console.log('防抖成功');
}

var inp = document.getElementById('inp');
inp.addEventListener('input', debounce(sayHi)); // 防抖


/**
 * 节流
 * 
 * @param {function} fn 
 */
function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为 true，不为 true 则 return
    canRun = false; // 立即设置为 false
    setTimeout(() => { // 将外部传入的函数的执行放在 setTimeout 中
      fn.apply(this, arguments);
      // 最后在 setTimeout 执行完毕后再把标记设置为 true(关键) 表示可以执行下一次循环了。当定时器没有执行的时候标记永远是 false，在开头被 return 掉
      canRun = true;
    }, 500);
  };
}
function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight);
}
window.addEventListener('resize', throttle(sayHi));