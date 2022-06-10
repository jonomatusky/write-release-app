import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import posthog from 'posthog-js'

const { REACT_APP_POSTHOG_KEY } = process.env

export default function usePageTrack() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    // !!REACT_APP_GA &&
    //   ReactGA.send({ hitType: 'pageview', page: pathname + search + hash })
    !!REACT_APP_POSTHOG_KEY && posthog.capture('$pageview')
  }, [pathname, hash, search])
}
