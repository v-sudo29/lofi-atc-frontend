import { VolumeSlider } from '../components/VolumeSlider'
import styles from './AtcStationsSection.module.scss'

export const AtcStationsSection = () => {
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
        <h2>ATC Stations</h2>
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
