import React from 'react'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import IndividualCard from './components/IndividualCard'
import ViewIndexPage from 'components/ViewIndexPage'

const ViewProfiles = () => {
  const { items } = useIndividualsStore()

  return <ViewIndexPage items={items} Item={IndividualCard} type="individual" />
}

export default ViewProfiles
