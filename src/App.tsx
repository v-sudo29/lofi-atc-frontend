import { KofiIcon } from './assets/KofiIcon'
import { MainWidget } from './components/MainWidget'
import { LightDarkModeToggle } from './components/LightDarkModeToggle'
import { useLightDarkMode } from './hooks/useLightDarkMode'
import { MODE } from './constants/LightDarkMode'
import KofiDesktopImage from './assets/images/support_me_on_kofi_dark.png'
import clsx from 'clsx'
import styles from './App.module.scss'

function App() {
  const { mode } = useLightDarkMode()
  console.log(import.meta.env.PROD)
  console.log(import.meta.env.VITE_PUBLIC_POSTHOG_HOST)
  console.log(import.meta.env.VITE_PUBLIC_POSTHOG_KEY)
  return (
    <div
      className={clsx(styles.layout, {
        [styles.layoutLightMode]: mode === MODE.LIGHT,
        [styles.layoutDarkMode]: mode === MODE.DARK,
      })}
    >
      <header className={styles.header}>
        <a
          className={styles.homeLink}
          href='/'
        >
          <h1
            className={clsx({
              [styles.titleLightMode]: mode === MODE.LIGHT,
              [styles.titleDarkMode]: mode === MODE.DARK,
            })}
          >
            comfy lofi
          </h1>
        </a>
        <div className={styles.kofiButtonContainer}>
          <a
            className={clsx(styles.kofiButton, {
              [styles.kofiButtonLightMode]: mode === MODE.LIGHT,
              [styles.kofiButtonDarkMode]: mode === MODE.DARK,
            })}
            href='https://ko-fi.com/milkandcode'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className={styles.mobileKofiIconContainer}>
              <KofiIcon />
            </span>
            <span className={styles.desktopKofiIconContainer}>
              <img
                src={KofiDesktopImage}
                alt=''
              />
            </span>
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <MainWidget />
        <LightDarkModeToggle />
      </main>
    </div>
  )
}

export default App
