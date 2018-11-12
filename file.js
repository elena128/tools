/**
 * file对象和blob对象转换为dataURL  blob => binary large object
 */
export function readBlobAsDataURL(blob, callback) {
  let a = new FileReader()
  a.onload = function (e) {
    callback(e.target.result)
  }
  a.readAsDataURL(blob)
}

/**
 * dataURL转化为blob对象
 */
export function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * blob to url
 **/
export function blobToURL (blob) {
  return {
    url: window.URL.createObjectURL(blob),
    revokeFn: () => window.URL.revokeObjectURL(blob)
  }
}

/**
 * download url/blob
 **/
export function download (target, downloadName) {
  let url = '';
  if (target instanceof Blob) {
    url = blobToURL(target);
  } else if (typeof target === 'string') {
    url = target;
  }

  if (!url) return false
  let a = document.createElement('a')
  a.href = url.url
  a.download = downloadName || ''
  a.click()
  if (url.revokeFn) url.revokeFn()
  a = null
}

export function download2(url) {
  let a = document.createElement('a')
  a.href = url
  a.click()
}

/**
 * 图片转化为base64
 **/
export function tobase64(file, callback) {
  const type = file.type
  let reader = new FileReader()
  reader.onload = (e) => {
    let img = document.createElement('img')
    img.onload = () => {
      imgSrc =img.naturalWidth > 480 ? compressImg(img, type) : img.src
      callback(imgSrc)
    }
    img.attr('src', e.target.result)
  }
  reader.readAsDataURL(file)
}

/**
 * 压缩图片
 **/
export function compressImg(sourceImgObj, type) {
  const drawWidth = sourceImgObj.naturalWidth
  const drawHeight = sourceImgObj.naturalHeight
  const newWidth = 480
  const newHeight = 480 * drawHeight / drawWidth
  let cvs = document.createElement('canvas')
  let ctx = cvs.getContext('2d')
  cvs.width = newWidth
  cvs.height = newHeight
  ctx.drawImage(sourceImgObj, 0, 0, newWidth, newHeight)
  return cvs.toDataURL(type, 0.5)
}

/**
 * 图片加载
 **/
export function loadingFunc(imgs) {
  const len = imgs.length
  let count = 0
  return new Promise(resolve => {
    imgs.reduce((pre, item,  k) => {
      pre[k] = new Image()
      pre[k].onload = () => {
        if (++count >= len) {
          resolve(true)
        }
      }
      pre[k].src = item
      return pre
    }, {})
  })
}
