import { useEffect, useCallback } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import useOrganizationStore from './store/use-organizations-store'

const useFetchLogo = id => {
  const { select, setLogo } = useOrganizationStore()

  const organization = select(id)
  const { logo, logoUrl } = organization

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
}

export default useFetchLogo
