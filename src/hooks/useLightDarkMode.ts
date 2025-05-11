import { createContext, useContext } from 'react'
import { MODE } from '../constants/LightDarkMode'

interface LightDarkModeObject {
  mode: MODE
  setMode: React.Dispatch<React.SetStateAction<MODE>>
}

export const LightDarkModeContext = createContext<LightDarkModeObject>(
  {} as LightDarkModeObject
)

export const useLightDarkMode = () => {
  return useContext(LightDarkModeContext)
}
