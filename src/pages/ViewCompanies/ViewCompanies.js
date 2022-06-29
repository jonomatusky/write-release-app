import React from 'react'
import useOrganizationsStore from 'hooks/store/use-organizations-store'
import OrganizationCard from './components/OrganizationCard'
import ViewIndexPage from 'components/ViewIndexPage'

const ViewCompanies = () => {
  const { items } = useOrganizationsStore()

  return (
    <ViewIndexPage items={items} Item={OrganizationCard} type="organization" />
  )
}

export default ViewCompanies
