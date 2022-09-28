import React from 'react'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import OrganizationCard from './components/OrganizationCard'
import ViewIndexPage from 'components/ViewIndexPage'
import FabAdd from 'components/FabAdd'
import { DomainAdd } from '@mui/icons-material'
import DialogCreateCompany from './components/DialogCreateCompany'

const ViewCompanies = () => {
  const { items } = useOrganizationsStore()

  return (
    <>
      <FabAdd Icon={DomainAdd} Dialog={DialogCreateCompany} />
      <ViewIndexPage
        items={items}
        Item={OrganizationCard}
        type="organization"
        Icon={DomainAdd}
      />
    </>
  )
}

export default ViewCompanies
