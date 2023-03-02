import { useEffect } from 'react'
import useContentStore from './store/use-content-store'
import useQuestionsStore from './store/use-questions-store'
import useUsersStore from './store/use-users-store'
import useSession from './use-session'

const useFetchContent = () => {
  const { fetch: fetchContent, fetchStatus: fetchContentStatus } =
    useContentStore()
  const { fetch: fetchQuestions, fetchStatus: fetchQuestionsStatus } =
    useQuestionsStore()
  const { fetch: fetchUsers, fetchStatus: fetchUsersStatus } = useUsersStore()
  const { user } = useSession()

  useEffect(() => {
    if (!!user && fetchContentStatus === 'idle') {
      try {
        fetchContent()
      } catch (err) {}
    }
  }, [fetchContent, fetchContentStatus, user])

  useEffect(() => {
    if (!!user && fetchQuestionsStatus === 'idle') {
      try {
        fetchQuestions()
      } catch (err) {}
    }
  }, [fetchQuestions, fetchQuestionsStatus, user])

  useEffect(() => {
    if (!!user && fetchUsersStatus === 'idle') {
      try {
        fetchUsers()
      } catch (err) {}
    }
  })
}

export default useFetchContent
