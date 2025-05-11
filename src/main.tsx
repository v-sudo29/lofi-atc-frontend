import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LightDarkModeProvider from './contexts/lightDarkModeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LightDarkModeProvider>
      <App />
    </LightDarkModeProvider>
  </StrictMode>
)
