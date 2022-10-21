import React, { useState } from 'react'
import { IosShare, Visibility } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import useAlertStore from 'hooks/store/use-alert-store'
import useContentStore from 'hooks/store/use-content-store'
import useRequest from 'hooks/use-request'

const ButtonGoogleDoc = ({ id, onUpdate }) => {
  const { select, get } = useContentStore()
  const { setError } = useAlertStore()
  const content = select(id)
  const { draftUrl, title } = content
  const { request } = useRequest()

  const [loading, setLoading] = useState(false)

  console.log(content.draftUrl)

  const handleClick = async () => {
    if (!!draftUrl) {
      window.open(draftUrl, '_blank')
    } else {
      setLoading(true)

      try {
        await onUpdate()

        await get(id)

        if (!!draftUrl) {
          window.open(draftUrl, '_blank')
        } else if (!title) {
          setError({ message: 'Please add a title before creating a draft' })
          setLoading(false)
        } else {
          await request({
            url: '/google-doc',
            method: 'post',
            data: { id },
          })

          const timer = setTimeout(async () => {
            await get(id)

            // if (!!draftUrl) {
            //   window.open(draftUrl, '_blank')
            // }

            setLoading(false)
          }, 10000)

          return () => clearTimeout(timer)
        }
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
  }

  return (
    <LoadingButton
      endIcon={!!draftUrl ? <Visibility /> : <IosShare />}
      variant="contained"
      loading={loading}
      onClick={handleClick}
      disableElevation
    >
      {!!draftUrl ? 'View Doc' : 'Export to Docs'}
    </LoadingButton>
  )
}

export default ButtonGoogleDoc
