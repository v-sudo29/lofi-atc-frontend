import VolumeSlider from '../components/VolumeSlider'
import styles from './AtcStationsSection.module.scss'

const AtcStationsSection = () => {
  return (
    <div className={styles.section}>
      <h2>ATC Stations</h2>
      <VolumeSlider />
    </div>
  )
}
export default AtcStationsSection
