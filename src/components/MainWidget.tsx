import { useEffect, useRef, useState } from 'react'
import { AtcStationsSection } from './atc-stations-section/AtcStationsSection'
import { LofiBeatsSection } from './lofi-beats-section/LofiBeatsSection'
import { PlayButton } from './play-button/PlayButton'
import { useLightDarkMode } from '../hooks/useLightDarkMode'
import { MODE } from '../constants/LightDarkMode'
import styles from './MainWidget.module.scss'
import clsx from 'clsx'

export const MainWidget = () => {
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
    <div
      className={clsx(styles.mainWidget, {
        [styles.mainWidgetLightMode]: mode === MODE.LIGHT,
        [styles.mainWidgetDarkMode]: mode === MODE.DARK,
      })}
    >
      <LofiBeatsSection
        currentSong={currentSong}
        lofiDropdownRef={lofiDropdownRef}
      />
      <AtcStationsSection />
      <PlayButton />
    </div>
  )
}
