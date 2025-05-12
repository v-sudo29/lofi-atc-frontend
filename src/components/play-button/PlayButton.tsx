import { PlayIcon } from '../../assets/PlayIcon'
import styles from './PlayButton.module.scss'

export const PlayButton = () => {
  return (
    <button className={styles.button}>
      <PlayIcon />
      PLAY
    </button>
  )
}
