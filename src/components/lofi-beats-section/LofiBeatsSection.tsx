import { useEffect, useRef, useState } from 'react'
import VolumeIcon from '../../assets/VolumeIcon'
import MusicIcon from '../../assets/MusicIcon'
import ChevronDownIcon from '../../assets/ChevronDownIcon'
import DicesIcon from '../../assets/DicesIcon'
import styles from './LofiBeatsSection.module.scss'

const LofiBeatsSection = () => {
  const [currentSong, setCurrentSong] = useState<string | null>(null)

  const volumeSlideRef = useRef<HTMLInputElement>(null)
  const lofiDropdownRef = useRef<HTMLSelectElement>(null)

  const handleThumbLeftSpaceColoring = () => {
    if (volumeSlideRef.current) {
      const slider = volumeSlideRef.current
      const min = Number(slider.min)
      const max = Number(slider.max)
      const value = Number(slider.value)
      const percent = ((value - min) / (max - min)) * 100
      let adjustedPercent

      if (value >= 0 && value < 12)
        adjustedPercent = Math.min(percent + 5.5, 100)
      else if (value >= 12 && value < 33)
        adjustedPercent = Math.min(percent + 3.3, 100)
      else if (value >= 33 && value < 47)
        adjustedPercent = Math.min(percent + 1.5, 100)
      else if (value >= 47 && value < 60)
        adjustedPercent = Math.min(percent - 0.2, 100)
      else if (value >= 60 && value < 70)
        adjustedPercent = Math.min(percent - 1.7, 100)
      else if (value >= 70 && value <= 80)
        adjustedPercent = Math.min(percent - 3, 100)
      else if (value >= 80 && value <= 90)
        adjustedPercent = Math.min(percent - 4.5, 100)
      else if (value >= 90 && value <= 100)
        adjustedPercent = Math.min(percent - 5.7, 100)
      slider.style.background = `linear-gradient(to right, black 0%, black ${adjustedPercent}%, #e6e6e6 ${adjustedPercent}%, #e6e6e6 100%)`
    }
  }

  const setCustomDropdownSong = () => {
    if (lofiDropdownRef.current) setCurrentSong(lofiDropdownRef.current.value)
  }

  /**
   * On load - set volume slider left coloring
   */
  useEffect(() => {
    if (volumeSlideRef.current) handleThumbLeftSpaceColoring()
  }, [])

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
        <div className={styles.volumeSliderComponent}>
          <div className={styles.volumeIconContainer}>
            <VolumeIcon />
          </div>
          <input
            ref={volumeSlideRef}
            className={styles.volumeSlider}
            type='range'
            min='1'
            max='100'
            onChange={handleThumbLeftSpaceColoring}
          ></input>
        </div>
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

export default LofiBeatsSection
