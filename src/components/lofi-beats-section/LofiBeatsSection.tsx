import { useEffect, useRef, useState } from 'react'
import { MusicIcon } from '../../assets/MusicIcon'
import { ChevronDownIcon } from '../../assets/ChevronDownIcon'
import { DicesIcon } from '../../assets/DicesIcon'
import { VolumeSlider } from '../components/VolumeSlider'
import { useLightDarkMode } from '../../hooks/useLightDarkMode'
import { MODE } from '../../constants/LightDarkMode'
import styles from './LofiBeatsSection.module.scss'
import clsx from 'clsx'

export const LofiBeatsSection = () => {
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const { mode } = useLightDarkMode()

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
        <h2
          className={clsx({
            [styles.lofiBeatsTitleLightMode]: mode === MODE.LIGHT,
            [styles.lofiBeatsTitleDarkMode]: mode === MODE.DARK,
          })}
        >
          Lofi Beats
        </h2>
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
          <div
            className={clsx(styles.lofiCustomSelect, {
              [styles.lofiCustomSelectDarkMode]: mode === MODE.DARK,
            })}
          >
            <MusicIcon className={styles.musicIcon} />
            {currentSong}
            <ChevronDownIcon className={styles.chevronDownIcon} />
          </div>
        </div>
        <button
          className={clsx(styles.dicesButton, {
            [styles.dicesButtonDarkMode]: mode === MODE.DARK,
          })}
        >
          <DicesIcon />
        </button>
      </div>
    </div>
  )
}
