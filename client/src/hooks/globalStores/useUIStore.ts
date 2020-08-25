import { useContext } from 'react'
import { UIContext } from '~context/UIContext'

const useUIStore = () => {
  const uiContext = useContext(UIContext)
  return uiContext
}

export default useUIStore
