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
  const customOptionsContainerRef = useRef<HTMLDivElement>(null)

  const handleCustomSelectClick = () => {
    if (!isOptionsDisplayed) {
      setIsOptionsDisplayed(true)
      handleCustomOptionsContainerResize()
    } else setIsOptionsDisplayed(false)
  }

  const handleCustomOptionsContainerResize = () => {
    if (customSelectRef.current) {
      setCustomSelectWidth(customSelectRef.current.offsetWidth)
    }
  }

  const handleOutsideOptionsContainerClick = (
    e: React.FocusEvent<HTMLDivElement, Element>
  ) => {
    const element = e.target as HTMLElement

    if (isOptionsDisplayed && element && customOptionsContainerRef.current) {
      setIsOptionsDisplayed(false)
    }
  }

  useEffect(() => {
    if (customSelectRef.current) {
      window.addEventListener('resize', handleCustomOptionsContainerResize)

      return () =>
        window.removeEventListener('resize', handleCustomOptionsContainerResize)
    }
  }, [])

  useEffect(() => {
    if (isOptionsDisplayed && customOptionsContainerRef.current) {
      customOptionsContainerRef.current.focus()
    }
  }, [isOptionsDisplayed])

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
              ref={customOptionsContainerRef}
              className={clsx(styles.lofiOptionsContainer, {
                [styles.lofiOptionsContainerDarkMode]: mode === MODE.DARK,
              })}
              style={
                customSelectWidth
                  ? { width: `${customSelectWidth}px` }
                  : undefined
              }
              onBlur={handleOutsideOptionsContainerClick}
              tabIndex={0}
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
