const { useCallback, useState } = require('react')
const { default: useRequest } = require('./use-request')

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
        const res = await request({
          url: `/generator`,
          method: 'POST',
          data: {
            contentId: id,
            operationType: type,
            iteration,
          },
          timeout: 30000,
        })

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
