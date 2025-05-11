import { ReactNode, useState } from 'react'
import { MODE } from '../constants/LightDarkMode'
import { LightDarkModeContext } from '../hooks/useLightDarkMode'

const LightDarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState(MODE.LIGHT)

  return (
    <LightDarkModeContext.Provider value={{ mode, setMode }}>
      {children}
    </LightDarkModeContext.Provider>
  )
}

export default LightDarkModeProvider
