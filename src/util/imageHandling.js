export const loadImgAsync = imgSrc => {
  return new Promise((resolve, reject) => {
    let img = document.createElement('img')
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject('error loading image')
    }
    img.src = imgSrc
  })
}

const imgToBlobAsync = (img, canvas, croppedAreaPixels) => {
  return new Promise((resolve, reject) => {
    const ctxMain = canvas.getContext('2d')
    if (croppedAreaPixels) {
      let { x, y, width, height } = croppedAreaPixels
      ctxMain.drawImage(
        img,
        x,
        y,
        width,
        height,
        0,
        0,
        canvas.width,
        canvas.height
      )
    } else {
      ctxMain.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

    ctxMain.canvas.toBlob(async blob => {
      resolve(blob)
    }, 'image/jpeg')
  })
}

export const resizeImage = async (
  imgUrl,
  maxDimension = 600,
  croppedAreaPixels
) => {
  try {
    const image = await loadImgAsync(imgUrl)

    const canvas = document.createElement('canvas')

    let width
    let height

    if (croppedAreaPixels) {
      width = croppedAreaPixels.width
      height = croppedAreaPixels.height
    } else {
      width = image.width
      height = image.height
    }

    let shortEdgeLength = Math.min(width, height)

    if (shortEdgeLength > maxDimension) {
      let scale = maxDimension / shortEdgeLength
      width = Math.round(width * scale)
      height = Math.round(height * scale)
    }

    canvas.width = width
    canvas.height = height

    const blob = await imgToBlobAsync(image, canvas, croppedAreaPixels)

    return blob
  } catch (err) {
    const error = new Error('Please upload an image file.')
    throw error
  }
}
