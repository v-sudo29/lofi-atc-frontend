import { VolumeSlider } from '../components/VolumeSlider'
import { useLightDarkMode } from '../../hooks/useLightDarkMode'
import { MODE } from '../../constants/LightDarkMode'
import { AudioData } from '../MainWidget'
import styles from './AtcStationsSection.module.scss'
import clsx from 'clsx'

export const AtcStationsSection = ({
  handleAtcVolumeUpdate,
  handleAtcOptionClick,
  atcAudioData,
  currentAtc,
}: {
  handleAtcVolumeUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAtcOptionClick: (atcStation: AudioData) => void
  atcAudioData: AudioData[]
  currentAtc: AudioData
}) => {
  const { mode } = useLightDarkMode()

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
        <VolumeSlider
          currentVolume={currentAtc.audio.volume}
          handleVolumeUpdate={handleAtcVolumeUpdate}
          defaultVolumeValue={currentAtc.audio.volume * 100}
        />
      </div>
      <div className={styles.stationButtonsContainer}>
        {atcAudioData.map((station, i) => (
          <button
            key={`${station.name}-${i}`}
            className={clsx(styles.stationButton, {
              [styles.stationButtonDarkMode]: mode === MODE.DARK,
              [styles.activeButtonLightMode]:
                station.name === currentAtc.name && mode === MODE.LIGHT,
              [styles.activeButtonDarkMode]:
                station.name === currentAtc.name && mode === MODE.DARK,
            })}
            onClick={() => handleAtcOptionClick(station)}
          >
            {station.name}
          </button>
        ))}
      </div>
    </div>
  )
}
export default AtcStationsSection
