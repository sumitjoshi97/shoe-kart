import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'

import useStores from '~hooks/useStores'
import { loginUserMutation, signupUserMutation } from './queries'

export const authTypes = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
}

const useAuth = () => {
  const { authStore } = useStores()
  const { addUser, isAuth } = authStore
  const [authType, setAuthType] = useState(authTypes.LOGIN)

  const [
    loginUserMutationFun,
    { loading: isLoginUserLoading, data: loginData },
  ] = useMutation(loginUserMutation)

  const [
    signupUserMutationFun,
    { loading: isSignupUserLoading, data: signupData },
  ] = useMutation(signupUserMutation)

  useEffect(() => {
    if (!isAuth && (loginData || signupData)) {
      const userId = loginData.login.user._id || signupData.signup.user._id
      const accessToken = loginData.login.token || signupData.signup.token

      addUser(userId, accessToken)
    }
  }, [loginData, signupData])

  const handleLoginUser = (email: string, password: string) => {
    loginUserMutationFun({
      variables: {
        email,
        password,
      },
    })
  }

  const handleSignupUser = (email: string, password: string, name: string) => {
    signupUserMutationFun({
      variables: {
        email,
        password,
        name,
      },
    })
  }

  return {
    loginOrSignupUser: (email: string, password: string, name?: string) => {
      if (authType === authTypes.LOGIN) {
        return handleLoginUser(email, password)
      }
      if (authType === authTypes.SIGNUP) {
        return handleSignupUser(email, password, name!)
      }
    },
    authType,
    isLoginUserLoading,
    isSignupUserLoading,
    setAuthType,
  }
}

export default useAuth
