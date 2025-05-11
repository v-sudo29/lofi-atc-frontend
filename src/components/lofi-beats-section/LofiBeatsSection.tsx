import { useEffect, useRef, useState } from 'react'
import { MusicIcon } from '../../assets/MusicIcon'
import { ChevronDownIcon } from '../../assets/ChevronDownIcon'
import { DicesIcon } from '../../assets/DicesIcon'
import { VolumeSlider } from '../components/VolumeSlider'
import styles from './LofiBeatsSection.module.scss'

export const LofiBeatsSection = () => {
  const [currentSong, setCurrentSong] = useState<string | null>(null)

  const lofiDropdownRef = useRef<HTMLSelectElement>(null)

  const setCustomDropdownSong = () => {
    if (lofiDropdownRef.current) setCurrentSong(lofiDropdownRef.current.value)
  }

  /**
   * On load - set current song
   */
  useEffect(() => {
    if (
      lofiDropdownRef.current &&
      currentSong !== lofiDropdownRef.current.value
    )
      setCustomDropdownSong()
  }, [currentSong])

  return (
    <div className={styles.lofiBeatsSection}>
      <div className={styles.lofiBeatsHeader}>
        <h2>Lofi Beats</h2>
        <VolumeSlider />
      </div>
      <div className={styles.lofiDropdownSection}>
        <div className={styles.lofiDropdownContainer}>
          <select
            ref={lofiDropdownRef}
            className={styles.lofiBeatsDropdown}
            name='lofi-beats-dropdown'
            id='lofi-beats-dropdown'
          >
            <option value='bento box love letters'>
              bento box love letters
            </option>
            <option value='Song title'>Song title</option>
          </select>
          <div className={styles.lofiCustomSelect}>
            <MusicIcon />
            {currentSong}
            <ChevronDownIcon className={styles.chevronDownIcon} />
          </div>
        </div>
        <button className={styles.dicesButton}>
          <DicesIcon />
        </button>
      </div>
    </div>
  )
}
