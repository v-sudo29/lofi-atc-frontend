import { useEffect, useRef, useState } from 'react'
import { AtcStationsSection } from './atc-stations-section/AtcStationsSection'
import { LofiBeatsSection } from './lofi-beats-section/LofiBeatsSection'
import { PlayButton } from './play-button/PlayButton'
import { useLightDarkMode } from '../hooks/useLightDarkMode'
import { MODE } from '../constants/LightDarkMode'
import lofiAudioOne from '../assets/bento-box-love-letters.mp3'
import atcAudioOne from '../assets/atc-trimmed.mp3'
import styles from './MainWidget.module.scss'
import clsx from 'clsx'

export const MainWidget = () => {
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const { mode } = useLightDarkMode()

  const lofiDropdownRef = useRef<HTMLSelectElement>(null)
  const lofiSongOne = useRef<HTMLAudioElement>(null)
  const atcAudioFirst = useRef<HTMLAudioElement>(null)

  const setCustomDropdownSong = () => {
    if (lofiDropdownRef.current) setCurrentSong(lofiDropdownRef.current.value)
  }

  const handlePlayLofi = () => lofiSongOne.current?.play()
  const handlePlayAtc = () => atcAudioFirst.current?.play()

  const handlePlayLofiAndAtc = () => {
    handlePlayLofi()
    handlePlayAtc()
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

  /**
   * On load - set default lofi and atc audio
   */
  useEffect(() => {
    if (!lofiSongOne.current) {
      lofiSongOne.current = new Audio(lofiAudioOne)
      console.log('Lofi song bento love letters set!')
    }
    if (!atcAudioFirst.current) {
      atcAudioFirst.current = new Audio(atcAudioOne)
      console.log('ATC audio set!')
    }
  }, [])

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
      <PlayButton handlePlayLofiAndAtc={handlePlayLofiAndAtc} />
    </div>
  )
}
