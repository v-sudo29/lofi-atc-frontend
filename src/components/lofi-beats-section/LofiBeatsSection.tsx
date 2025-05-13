import { MusicIcon } from '../../assets/MusicIcon'
import { ChevronDownIcon } from '../../assets/ChevronDownIcon'
import { DicesIcon } from '../../assets/DicesIcon'
import { VolumeSlider } from '../components/VolumeSlider'
import { useLightDarkMode } from '../../hooks/useLightDarkMode'
import { MODE } from '../../constants/LightDarkMode'
import styles from './LofiBeatsSection.module.scss'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

const fakeSongTitles = [
  { name: 'Song title' },
  { name: 'Song title' },
  { name: 'Song title' },
  { name: 'Song title' },
  { name: 'Song title' },
  { name: 'Song title' },
  { name: 'Song title' },
  { name: 'Song title' },
]

export const LofiBeatsSection = ({
  currentSong,
  lofiDropdownRef,
}: {
  currentSong: string | null
  lofiDropdownRef?: React.RefObject<HTMLSelectElement | null>
}) => {
  const [isOptionsDisplayed, setIsOptionsDisplayed] = useState(false)
  const [customSelectWidth, setCustomSelectWidth] = useState<number | null>(
    null
  )
  const { mode } = useLightDarkMode()
  const customSelectRef = useRef<HTMLDivElement>(null)

  const handleCustomSelectClick = () => {
    handleCustomOptionsContainerResize()
    setIsOptionsDisplayed(!isOptionsDisplayed)
  }

  const handleCustomOptionsContainerResize = () => {
    if (customSelectRef.current) {
      setCustomSelectWidth(customSelectRef.current.offsetWidth)
    }
  }

  useEffect(() => {
    if (customSelectRef.current) {
      window.addEventListener('resize', handleCustomOptionsContainerResize)

      return () =>
        window.removeEventListener('resize', handleCustomOptionsContainerResize)
    }
  }, [])

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
            ref={customSelectRef}
            className={clsx(styles.lofiCustomSelect, {
              [styles.lofiCustomSelectDarkMode]: mode === MODE.DARK,
            })}
            onClick={handleCustomSelectClick}
          >
            <MusicIcon className={styles.musicIcon} />
            {currentSong}
            <ChevronDownIcon className={styles.chevronDownIcon} />
          </div>
          {isOptionsDisplayed && (
            <div
              className={styles.lofiOptionsContainer}
              style={
                customSelectWidth
                  ? { width: `${customSelectWidth}px` }
                  : undefined
              }
            >
              {fakeSongTitles.map((song, i) => {
                return (
                  <div
                    key={`${song.name}-${i}`}
                    className={styles.songOption}
                  >
                    {song.name}
                  </div>
                )
              })}
            </div>
          )}
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
