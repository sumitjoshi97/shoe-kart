import { RouteComponentProps } from 'react-router-dom'

export interface IHeaderProps extends RouteComponentProps {}

export interface ISearchInputProps {
  searchText: string
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSearch: () => void
}
