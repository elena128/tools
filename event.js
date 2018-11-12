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
