import { useState, useEffect } from 'react'
import copyToClipboard from 'copy-to-clipboard'

const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isCopied])

  const copy = text => {
    setIsCopied(true)
    copyToClipboard(text)
  }

  return { copy, isCopied }
}

export default useCopy
