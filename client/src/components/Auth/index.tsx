import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo'
import * as queries from './queries'
import Input from '../shared/Input'
import './styles.scss'
import { IFormInput } from './interface'
import { useGlobalDispatch } from '~store'
import Button from '~components/shared/Button'
import Dialog from '~components/shared/Dialog'
import Title from '~components/shared/Title'

const Auth: React.FC = () => {
  const formTypes = {
    login: 'login',
    signup: 'signup',
  }

  const formInputState: IFormInput = {
    name: '',
    email: '',
    password: '',
  }

  const [formType, setFormType] = useState<string>(formTypes.login)
  const [formInput, setFormInput] = useState<IFormInput>(formInputState)
  const { dispatch } = useGlobalDispatch()

  const mutation =
    formType === formTypes.login ? queries.loginUser : queries.signupUser
  const [signupOrLogin, { data }] = useMutation(mutation)

  const handleFormType = () => {
    formType === formTypes.login
      ? setFormType(formTypes.signup)
      : setFormType(formTypes.login)
  }

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormInput({ ...formInput, [name]: value })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const mutationVariables =
      formType === formTypes.login
        ? { email: formInput.email, password: formInput.password }
        : {
            email: formInput.email,
            password: formInput.password,
            name: formInput.name,
          }
    signupOrLogin({ variables: mutationVariables })
    setFormInput(formInputState)
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'ADD_USER',
        user: data.login.user._id,
        token: data.login.token,
      })
    }
  }, [data])

  return (
    <Dialog>
      <div className="auth">
        <Title>{formType}</Title>
        <form
          className="auth__form"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleFormSubmit(e)
          }
          autoComplete="off"
        >
          {formType === formTypes.signup ? (
            <Input
              type="text"
              label="name"
              name="name"
              inputValue={formInput['name']}
              handleInput={handleFormInput}
            />
          ) : null}
          <Input
            type="email"
            label="email"
            name="email"
            inputValue={formInput['email']}
            handleInput={handleFormInput}
          />
          <Input
            type="password"
            label="password"
            name="password"
            inputValue={formInput['password']}
            handleInput={handleFormInput}
          />
          <Button
            styles={{
              flex: 1,
              textTransform: 'capitalize',
              marginTop: '2.4rem',
            }}
            type="submit"
          >
            {formType}
          </Button>
        </form>
        <div className="auth__footer">
          {formType === formTypes.login ? (
            <div>
              New to Shopkart?<span onClick={handleFormType}>Join here</span>
            </div>
          ) : (
            <div>
              Already a Member?<span onClick={handleFormType}>Login now</span>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default Auth
