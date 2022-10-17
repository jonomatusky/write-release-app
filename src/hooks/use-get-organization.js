import { useEffect, useCallback, useState } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import useOrganizationsStore from './store/use-organizations-store'
import useIndividualsStore from './store/use-individuals-store'
import useSession from './use-session'

const useGetOrganization = id => {
  const { initializing, user } = useSession()
  const { getStatus, select, get, setLogo } = useOrganizationsStore()
  const { getByOrganization, getByOrganizationStatus } = useIndividualsStore()
  const organization = select(id)
  const { logo, logoUrl } = organization || {}
  const [status, setStatus] = useState('idle')

  const getOrganization = useCallback(
    async id => {
      if (!user) {
        try {
          await get(id)
          setStatus('succeeded')
        } catch (err) {
          setStatus('failed')
        }
      } else {
        setStatus('succeeded')
      }
    },
    [get, user]
  )

  useEffect(() => {
    if (getStatus === 'idle' && !!id && !initializing) {
      getOrganization(id)
    }
  }, [getOrganization, id, getStatus, initializing])

  const getLogo = useCallback(async () => {
    const storage = getStorage()
    const storageRef = ref(storage, logo)
    let url = await getDownloadURL(storageRef)

    setLogo({ id, logoUrl: url })
  }, [id, logo, setLogo])

  useEffect(() => {
    if (!!logo && !logoUrl) {
      getLogo()
    }
  }, [logo, logoUrl, setLogo, getLogo])

  useEffect(() => {
    if (getByOrganizationStatus === 'idle' && !!id) {
      try {
        getByOrganization(id)
      } catch (err) {}
    }
  }, [id, getByOrganization, getByOrganizationStatus])

  return { organization, status }
}

export default useGetOrganization
