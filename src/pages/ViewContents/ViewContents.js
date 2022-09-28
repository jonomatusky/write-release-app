import React from 'react'
import ViewIndexPage from 'components/ViewIndexPage'
import useContentStore from 'hooks/store/use-content-store'
import FabAdd from 'components/FabAdd'
import { NoteAdd } from '@mui/icons-material'
import DialogCreateContent from './components/DialogCreateContents'
import useFetchContent from 'hooks/use-fetch-content'

const ViewContents = () => {
  const { items } = useContentStore()

  useFetchContent()

  return (
    <>
      <FabAdd Icon={NoteAdd} Dialog={DialogCreateContent} />
      <ViewIndexPage items={items} type="content" mode="list" Icon={NoteAdd} />
    </>
  )
}

export default ViewContents
