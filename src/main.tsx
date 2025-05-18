import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LightDarkModeProvider from './contexts/lightDarkModeContext.tsx'
import { PostHogProvider } from 'posthog-js/react'

const options = {
  api_host: import.meta.env.PROD
    ? import.meta.env.VITE_PUBLIC_POSTHOG_HOST
    : '',
}
console.log({ options })
console.log(import.meta.env.VITE_PUBLIC_POSTHOG_HOST)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={
        import.meta.env.PROD ? import.meta.env.VITE_PUBLIC_POSTHOG_KEY : ''
      }
      options={options}
    >
      <LightDarkModeProvider>
        <App />
      </LightDarkModeProvider>
    </PostHogProvider>
  </StrictMode>
)
