import { RouteComponentProps } from 'react-router-dom'

export interface IProductProps
  extends RouteComponentProps<{ productId: string }> {}

export interface ISizeProps {
  size: number
  isSizeSelected: boolean
  selectSize: () => void
}
