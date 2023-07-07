const { useCallback, useState } = require('react')
const { default: useRequest } = require('./use-request')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const useGenerate = () => {
  const [status, setStatus] = useState('idle')
  const [options, setOptions] = useState([])
  const [message, setMessage] = useState('')

  const { request, cancel } = useRequest()

  const generate = useCallback(
    async (id, type, iteration) => {
      setStatus('loading')
      const oldOptions = options
      setOptions([])

      try {
        cancel()
        let res = await request({
          url: `/generator`,
          method: 'POST',
          data: {
            contentId: id,
            operationType: type,
            iteration,
          },
          timeout: 30000,
        })
        const { id: generationId } = res.data

        while (res.data.status !== 'COMPLETED') {
          await sleep(3000)
          res = await request({
            url: `/generator/${generationId}/check-status`,
            method: 'GET',
          })
        }

        const { message, options } = res.data

        setOptions(options)
        setMessage(message)
        setStatus('succeeded')
      } catch (err) {
        if (type !== 'text') {
          setOptions(oldOptions)
        } else {
          setOptions([])
        }

        setStatus('failed')
      }
    },
    [cancel, request, options]
  )

  return { status, generate, options, message }
}

export default useGenerate
