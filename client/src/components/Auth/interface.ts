export interface IFormInput {
  name: string
  email: string
  password: string
  [key: string]: string | undefined
}

export interface IFormInputProps {
  type: string
  label: string
  inputValue: string
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}