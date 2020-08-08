import { useState, useEffect } from 'react'
import { useGlobalState, useGlobalDispatch } from '~store'
import { useMutation } from '@apollo/react-hooks'
import { loginUserMutation, signupUserMutation } from './queries'

import isEmpty from '~helpers/isEmpty'

export const formTypes = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
}

const useAuth = () => {
  const { state } = useGlobalState()
  const { dispatch } = useGlobalDispatch()

  const [formType, setFormType] = useState(formTypes.LOGIN)

  const [loginUserMutationFun, { loading: isLoginUserLoading, data: loginData }] = useMutation(
    loginUserMutation,
  )

  const [signupUserMutationFun, { loading: isSignupUserLoading, data: signupData }] = useMutation(
    signupUserMutation,
  )


  useEffect(() => {
    if (isEmpty(state.userId) && (loginData || signupData)) {
      dispatch({
        type: 'ADD_USER',
        user: loginData.login.user._id || signupData.signup.user._id,
        token: loginData.login.token || signupData.signup.token,
      })
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

  const handleSignupUser = (email: string, password: string, name: string) {
    signupUserMutationFun({
      variables: {
        email,
        password,
        name
      }
    })
  }

  
  return {
    loginOrSignupUser: (email: string, password: string, name?: string) => {
      if (formType === formTypes.LOGIN) {
        return handleLoginUser(email, password)
      }
      if (formType === formTypes.SIGNUP) {
        return handleSignupUser(email, password, name!)
      }
    },
    formType,
    setFormType
  }
}

export default useAuth
