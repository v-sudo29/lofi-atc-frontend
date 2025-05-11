import { SunIcon } from '../assets/SunIcon'
import { MoonIcon } from '../assets/MoonIcon'
import { MODE } from '../constants/LightDarkMode'
import { useLightDarkMode } from '../hooks/useLightDarkMode'
import clsx from 'clsx'
import styles from './LightDarkModeToggle.module.scss'

export const LightDarkModeToggle = () => {
  const { mode, setMode } = useLightDarkMode()

  return (
    <div
      className={clsx(styles.toggleContainer, {
        [styles.containerLightMode]: mode === MODE.LIGHT,
        [styles.containerDarkMode]: mode === MODE.DARK,
      })}
    >
      <button
        onClick={() => setMode(MODE.LIGHT)}
        className={clsx(styles.lightModeButton, {
          [styles.lightButtonLightActive]: mode === MODE.LIGHT,
          [styles.lightButtonDarkActive]: mode === MODE.DARK,
        })}
      >
        <SunIcon />
      </button>
      <button
        onClick={() => setMode(MODE.DARK)}
        className={clsx(styles.darkModeButton, {
          [styles.darkButtonDarkActive]: mode === MODE.DARK,
        })}
      >
        <MoonIcon />
      </button>
    </div>
  )
}
