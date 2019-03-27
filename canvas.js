/**
 * 画图
 */
export function canvasDraw(ctx, imgUrl) {
  let img = new Image()
  img.onload = function(){
    ctx.drawImage(img)
  }
  img.src = imgUrl
}

export function fill(ctx, color, params = [20, 20, 150, 100]) {
  ctx.fillStyle = color
  ctx.fillRect(...params)
}

// requestAnimationFrame

canvas = {
  fill: 'fillStyle, fill, fillRect, fillText',
  stroke: 'strokeStyle, stroke, strokeRect, strokeRect',
  path: 'rect, lineTo, arc, arcTo, quadraticCurveTo, bezierCurveTo, isPointInPath',
  transform: 'scale, rotate, translate, transform, setTransform',
  image: 'createPattern, drawImage, toDataURL',
  line: 'lineCap, lineJoin, lineWidth, miterLimit',
  text: 'font, textAlign, textBaseline, measureText',
  gradient: 'createLinearGradient, createRadialGradient, addColorStop',
  shadow: 'shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY',
  method: 'moveTo, beginPath, closePath, clearRect, clip, globalAlpha, globalCompositeOperation',
  imageData: 'width, height, data, createImageData, getImageData, putImageData',
  others: 'save, restore, createEvent, getContext'
}

// 画圆弧形百分比：div+css:clip、div+css3:clip-path、svg、canvas
