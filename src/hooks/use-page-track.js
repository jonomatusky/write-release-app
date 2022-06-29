import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import posthog from 'posthog-js'
import useHistoryStore from './store/use-history-store'

const { REACT_APP_POSTHOG_KEY } = process.env

export default function usePageTrack() {
  const { pathname, search, hash } = useLocation()
  const location = `${pathname}${search}`
  const { add, history } = useHistoryStore()

  useEffect(() => {
    if (history[history.length - 1] !== location) {
      add(location)
    }
  }, [add, history, location])

  useEffect(() => {
    // !!REACT_APP_GA &&
    //   ReactGA.send({ hitType: 'pageview', page: pathname + search + hash })

    !!REACT_APP_POSTHOG_KEY && posthog.capture('$pageview')
  }, [pathname, hash, search])
}
