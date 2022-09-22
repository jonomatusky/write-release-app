import React from 'react'
import useIndividualsStore from 'hooks/store/use-individuals-store'
import IndividualCard from './components/IndividualCard'
import ViewIndexPage from 'components/ViewIndexPage'
import FabAdd from 'components/FabAdd'
import { PersonAdd } from '@mui/icons-material'
import DialogCreateIndividual from './components/DialogCreateIndividual'

const ViewProfiles = () => {
  const { items } = useIndividualsStore()

  return (
    <>
      <FabAdd Icon={PersonAdd} Dialog={DialogCreateIndividual} />
      <ViewIndexPage items={items} Item={IndividualCard} type="individual" />
    </>
  )
}

export default ViewProfiles
