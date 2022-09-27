import { useEffect } from 'react'
import useContentStore from './store/use-content-store'
import useContentTypesStore from './store/use-content-types-store'
import useQuestionsStore from './store/use-questions-store'
import useSession from './use-session'

const useFetchContent = () => {
  const { fetch: fetchContent, fetchStatus: fetchContentStatus } =
    useContentStore()
  const { fetch: fetchContentTypes, fetchStatus: fetchContentTypesStatus } =
    useContentTypesStore()
  const { fetch: fetchQuestions, fetchStatus: fetchQuestionsStatus } =
    useQuestionsStore()
  const { user } = useSession()

  useEffect(() => {
    if (!!user && fetchContentStatus === 'idle') {
      try {
        fetchContent()
      } catch (err) {}
    }
  }, [fetchContent, fetchContentStatus, user])

  useEffect(() => {
    if (!!user && fetchContentTypesStatus === 'idle') {
      try {
        fetchContentTypes()
      } catch (err) {}
    }
  }, [fetchContentTypes, fetchContentTypesStatus, user])

  useEffect(() => {
    if (!!user && fetchQuestionsStatus === 'idle') {
      try {
        fetchQuestions()
      } catch (err) {}
    }
  }, [fetchQuestions, fetchQuestionsStatus, user])
}

export default useFetchContent
