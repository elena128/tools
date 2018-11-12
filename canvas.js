/**
 * 画图
 */
export function canvasDraw(imgUrl) {
  let img = new Image()
  img.onload = function(){
    canvas.drawImage(img)
  }
  img.src = imgUrl
}
