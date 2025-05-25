import { PlayIcon } from '../../assets/PlayIcon'
import { PauseIcon } from '../../assets/PauseIcon'
import styles from './PlayButton.module.scss'

export const PlayButton = ({
  handlePlayLofiAndAmbience,
  handlePauseLofiAndAmbience,
  isAudioPlaying,
}: {
  handlePlayLofiAndAmbience: () => void
  handlePauseLofiAndAmbience: () => void
  isAudioPlaying: boolean
}) => {
  return (
    <button
      className={styles.button}
      onClick={
        isAudioPlaying ? handlePauseLofiAndAmbience : handlePlayLofiAndAmbience
      }
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
