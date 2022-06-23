import { useEffect, useCallback } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import useOrganizationsStore from './store/use-organizations-store'

const useGetOrganization = id => {
  const { getStatus, select, get, setLogo } = useOrganizationsStore()
  const organization = select(id)
  const { logo, logoUrl } = organization || {}

  const getOrganization = useCallback(
    async id => {
      try {
        await get(id)
      } catch (err) {}
    },
    [get]
  )

  useEffect(() => {
    if (getStatus === 'idle') {
      try {
        getOrganization(id)
      } catch (err) {}
    }
  }, [getOrganization, id, getStatus])

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

  return { organization, status: getStatus }
}

export default useGetOrganization
