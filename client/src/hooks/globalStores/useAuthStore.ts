import { useContext } from 'react'
import { AuthContext } from '~context/AuthContext'

const useAuthStore = () => {
  const authContext = useContext(AuthContext)
  return authContext
}

export default useAuthStore
