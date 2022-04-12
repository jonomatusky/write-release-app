import { useEffect, useState } from 'react'

const measureHeight = () => {
  return document.documentElement?.clientHeight || window.innerHeight
}

export const use100vh = () => {
  const [height, setHeight] = useState(measureHeight)

  useEffect(() => {
    function setMeasuredHeight() {
      const measuredHeight = measureHeight()
      setHeight(measuredHeight)
    }

    window.addEventListener('resize', setMeasuredHeight)
    return () => window.removeEventListener('resize', setMeasuredHeight)
  }, [])

  return height
}
