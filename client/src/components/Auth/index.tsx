import React, { useState } from 'react'

import Button from '~components/shared/Button'
import Dialog from '~components/shared/Dialog'
import Input from '~components/shared/Input'

import useAuth, { authTypes } from '~hooks/auth/useAuth'
import './styles.scss'

export interface IAuthInput {
  name: string
  email: string
  password: string
  [key: string]: string | undefined
}

const Auth = () => {
  const authInputState: IAuthInput = {
    name: '',
    email: '',
    password: '',
  }
  const [authInput, setAuthInput] = useState<IAuthInput>(authInputState)

  const { authType, setAuthType, loginOrSignupUser } = useAuth()

  const handleAuthInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAuthInput({ ...authInput, [name]: value })
  }

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginOrSignupUser(authInput.email, authInput.password, authInput.name)
  }

  return (
    <Dialog>
      <div className="auth">
        <h2>{authType}</h2>
        <form
          className="auth__form"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleAuthSubmit(e)
          }
          autoComplete="off"
        >
          {authType === authTypes.SIGNUP ? (
            <Input
              type="text"
              label="name"
              name="name"
              inputValue={authInput['name']}
              handleInput={handleAuthInput}
            />
          ) : null}
          <Input
            type="email"
            label="email"
            name="email"
            inputValue={authInput['email']}
            handleInput={handleAuthInput}
          />
          <Input
            type="password"
            label="password"
            name="password"
            inputValue={authInput['password']}
            handleInput={handleAuthInput}
          />
          <Button
            styles={{
              flex: 1,
              textTransform: 'capitalize',
              marginTop: '2.4rem',
            }}
            type="submit"
          >
            {authType}
          </Button>
        </form>
        <div className="auth__footer">
          {authType === authTypes.LOGIN ? (
            <div>
              New to Shopkart?
              <span onClick={() => setAuthType(authTypes.SIGNUP)}>
                Join here
              </span>
            </div>
          ) : (
            <div>
              Already a Member?
              <span onClick={() => setAuthType(authTypes.LOGIN)}>
                Login now
              </span>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default Auth
