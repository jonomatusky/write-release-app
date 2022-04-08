import React, { useState, useEffect } from 'react'
import { getStorage, ref } from 'firebase/storage'

const Image = ({ image, ...props }) => {
  const [imageUrl, setImageUrl] = useState(null)

  const storage = getStorage()

  const storageRef = ref(storage, image)

  useEffect(() => {
    if (image) {
      storageRef.getDownloadURL().then(url => {
        setImageUrl(url)
      })
    }
  })

  return <Image src={imageUrl} {...props} />
}

export default Image
