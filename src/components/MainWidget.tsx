import AtcStationsSection from './atc-stations-section/AtcStationsSection'
import LofiBeatsSection from './lofi-beats-section/LofiBeatsSection'
import PlayButton from './play-button/PlayButton'
import styles from './MainWidget.module.scss'

export const MainWidget = () => {
  return (
    <div className={styles.mainWidget}>
      <LofiBeatsSection />
      <AtcStationsSection />
      <PlayButton />
    </div>
  )
}
