import React, { useState } from 'react'

const Image = ({ alt, src, height, width, style, showLoading, ...props }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false)

  return (
    <div
      style={{
        width,
        height,
      }}
    >
      {!!src && (
        <img
          alt={alt}
          src={src}
          style={{ height, width, ...style }}
          {...props}
          hidden={!imageIsLoaded}
          onLoad={() => setImageIsLoaded(true)}
        />
      )}
    </div>
  )
}

export default Image
