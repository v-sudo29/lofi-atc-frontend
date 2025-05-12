import { VolumeSlider } from '../components/VolumeSlider'
import { useLightDarkMode } from '../../hooks/useLightDarkMode'
import { MODE } from '../../constants/LightDarkMode'
import styles from './AtcStationsSection.module.scss'
import clsx from 'clsx'

export const AtcStationsSection = () => {
  const { mode } = useLightDarkMode()

  const stationsData = [
    { name: 'BOS ', isActive: true },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
    { name: 'BOS ', isActive: false },
  ]

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2
          className={clsx({
            [styles.titleLightMode]: mode === MODE.LIGHT,
            [styles.titleDarkMode]: mode === MODE.DARK,
          })}
        >
          ATC Stations
        </h2>
        <VolumeSlider />
      </div>
      <div className={styles.stationButtonsContainer}>
        {stationsData.map((station, i) => (
          <button
            key={`${station.name}-${i}`}
            className={`${styles.stationButton} ${
              station.isActive && styles.activeButton
            }`}
          >
            {station.name}
          </button>
        ))}
      </div>
    </div>
  )
}
export default AtcStationsSection
