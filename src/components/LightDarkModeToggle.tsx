import { SunIcon } from '../assets/SunIcon'
import { MoonIcon } from '../assets/MoonIcon'
import styles from './LightDarkModeToggle.module.scss'

export const LightDarkModeToggle = () => {
  return (
    <div className={styles.toggleContainer}>
      <button className={styles.lightModeButton}>
        <SunIcon />
      </button>
      <button className={styles.darkModeButton}>
        <MoonIcon />
      </button>
    </div>
  )
}
