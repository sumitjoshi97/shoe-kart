export interface ISearchInputProps {
  searchText: string
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSearch: () => void
}