import { useEffect } from 'react'
import useOrganizationsStore from './store/use-organizations-store'

const useFetchIndividuals = id => {
  const { getIndividuals, getIndividualsStatus, select } =
    useOrganizationsStore()
  const organization = select(id)

  useEffect(() => {
    if (organization.id && getIndividualsStatus === 'idle') {
      try {
        console.log('fetching individuals')
        getIndividuals(id)
      } catch (err) {}
    }
  }, [id, getIndividuals, getIndividualsStatus, organization.id])
}

export default useFetchIndividuals
