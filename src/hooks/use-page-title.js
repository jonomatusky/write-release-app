import { useRef, useEffect } from 'react'

function usePageTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title)

  useEffect(() => {
    document.title = title || 'Write Release | Write great releases, fast'
  }, [title])

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current
      }
    },
    [prevailOnUnmount]
  )
}

export default usePageTitle
