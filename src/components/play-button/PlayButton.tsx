import { PlayIcon } from '../../assets/PlayIcon'
import styles from './PlayButton.module.scss'

const PlayButton = () => {
  return (
    <button className={styles.button}>
      <PlayIcon />
      PLAY
    </button>
  )
}

export default PlayButton
