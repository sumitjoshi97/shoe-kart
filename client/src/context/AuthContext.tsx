import React, { createContext, ReactNode, useState } from 'react'

export interface IAuthContext {
  isAuth: boolean
  userId: string
  accessToken: string
  addUser: (userId: string, token: string) => void
  removeUser: () => void
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider: React.FC<ReactNode> = ({ children }) => {
  const [userId, setUserId] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const addUser = (userId: string, token: string) => {
    if (!localStorage.getItem('credentials')) {
      const credentials = {
        user_id: userId,
        access_token: token,
        token_type: 'bearer',
      }
      localStorage.setItem('credentials', JSON.stringify(credentials))
    }
    setUserId(userId)
    setAccessToken(token)
  }

  const removeUser = () => {
    localStorage.removeItem('credentials')
    setUserId('')
    setAccessToken('')
  }
  return (
    <AuthContext.Provider
      value={{ userId, accessToken, addUser, removeUser, isAuth: !!userId }}
    >
      {children}
    </AuthContext.Provider>
  )
}
