import { useQuery } from '@apollo/react-hooks'
import { useMemo } from 'react'

import useStores from '~hooks/useStores'
import { fetchUserQuery } from './queries'

const useUser = () => {
  const { authStore } = useStores()
  const { userId } = authStore

  const { data: userData, loading: userLoading } = useQuery(fetchUserQuery)

  const user = useMemo(() => {
    if (userData) return userData.currentUser

    return null
  }, [userData, userId])

  return {
    user,
    userLoading,
  }
}

export default useUser
