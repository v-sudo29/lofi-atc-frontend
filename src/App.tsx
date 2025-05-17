import { KofiIcon } from './assets/KofiIcon'
import { MainWidget } from './components/MainWidget'
import { LightDarkModeToggle } from './components/LightDarkModeToggle'
import { useLightDarkMode } from './hooks/useLightDarkMode'
import { MODE } from './constants/LightDarkMode'
import clsx from 'clsx'
import styles from './App.module.scss'

function App() {
  const { mode } = useLightDarkMode()

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
            comfylofi
          </h1>
        </a>
        <div className={styles.kofiButtonContainer}>
          <button
            className={clsx(styles.kofiButton, {
              [styles.kofiButtonLightMode]: mode === MODE.LIGHT,
              [styles.kofiButtonDarkMode]: mode === MODE.DARK,
            })}
          >
            <KofiIcon />
          </button>
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
