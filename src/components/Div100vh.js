import React, { forwardRef } from 'react'
import { use100vh } from 'hooks/use-100-vh'

const Div100vh = forwardRef(({ style, ...other }, ref) => {
  const height = use100vh()

  const styleWithRealHeight = {
    ...style,
    height: height ? `${height}px` : '100vh',
  }
  return <div ref={ref} style={styleWithRealHeight} {...other} />
})

export default Div100vh
