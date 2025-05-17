import { PlayIcon } from '../../assets/PlayIcon'
import { PauseIcon } from '../../assets/PauseIcon'
import styles from './PlayButton.module.scss'

export const PlayButton = ({
  handlePlayLofiAndAtc,
  handlePauseLofiAndAtc,
  isAudioPlaying,
}: {
  handlePlayLofiAndAtc: () => void
  handlePauseLofiAndAtc: () => void
  isAudioPlaying: boolean
}) => {
  return (
    <button
      className={styles.button}
      onClick={isAudioPlaying ? handlePauseLofiAndAtc : handlePlayLofiAndAtc}
    >
      {isAudioPlaying ? (
        <>
          <PauseIcon />
          PAUSE
        </>
      ) : (
        <>
          <PlayIcon />
          PLAY
        </>
      )}
    </button>
  )
}
