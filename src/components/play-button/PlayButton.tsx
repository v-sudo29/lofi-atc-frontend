import { PlayIcon } from '../../assets/PlayIcon'
import styles from './PlayButton.module.scss'

export const PlayButton = ({
  handlePlayLofiAndAtc,
}: {
  handlePlayLofiAndAtc: () => void
}) => {
  return (
    <button
      className={styles.button}
      onClick={handlePlayLofiAndAtc}
    >
      <PlayIcon />
      PLAY
    </button>
  )
}
