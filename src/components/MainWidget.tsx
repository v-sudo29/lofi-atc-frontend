import { useRef, useState } from 'react'
import { AtcStationsSection } from './atc-stations-section/AtcStationsSection'
import { LofiBeatsSection } from './lofi-beats-section/LofiBeatsSection'
import { PlayButton } from './play-button/PlayButton'
import { useLightDarkMode } from '../hooks/useLightDarkMode'
import { MODE } from '../constants/LightDarkMode'
import lofiBentoBoxAudio from '../assets/lofiAudio/bento-box-love-letters.mp3'
import lofiRainySeasonAudio from '../assets/lofiAudio/rainy-season-confessions.mp3'
import lofiPixelSkiesAudio from '../assets/lofiAudio/pixel-skies.mp3'
import lofiNightTimeAudio from '../assets/lofiAudio/night-time-blue-light.mp3'
import lofiSunsetRooftopAudio from '../assets/lofiAudio/sunset-on-the-rooftop.mp3'
import lofiThinkingOfYouAudio from '../assets/lofiAudio/thinking-of-you-wherever-you-are.mp3'
import atcAudioOne from '../assets/atc-trimmed.mp3'
import styles from './MainWidget.module.scss'
import clsx from 'clsx'

export interface AudioData {
  name: string
  audio: HTMLAudioElement
}

const lofiSongsData: AudioData[] = [
  {
    name: 'bento box love letters',
    audio: new Audio(lofiBentoBoxAudio),
  },
  {
    name: 'rainy season confessions',
    audio: new Audio(lofiRainySeasonAudio),
  },
  { name: 'pixel skies', audio: new Audio(lofiPixelSkiesAudio) },
  { name: 'night time blue light', audio: new Audio(lofiNightTimeAudio) },
  { name: 'sunset on the rooftop', audio: new Audio(lofiSunsetRooftopAudio) },
  {
    name: 'thinking of you wherever you are',
    audio: new Audio(lofiThinkingOfYouAudio),
  },
]

const atcAudioData: AudioData[] = [
  {
    name: 'BOS',
    audio: new Audio(atcAudioOne),
  },
]

export const MainWidget = () => {
  const [currentSong, setCurrentSong] = useState<AudioData>(lofiSongsData[0])
  const { mode } = useLightDarkMode()

  const lofiDropdownRef = useRef<HTMLSelectElement>(null)
  const atcAudioFirst = useRef<HTMLAudioElement>(atcAudioData[0].audio)

  const handlePlayLofi = () => currentSong.audio.play()
  const handlePlayAtc = () => atcAudioFirst.current?.play()
  const handlePauseLofi = () => currentSong.audio.pause()
  const handlePauseAtc = () => atcAudioFirst.current?.pause()

  const handlePlayLofiAndAtc = () => {
    handlePlayLofi()
    handlePlayAtc()
  }

  const handleSongOptionClick = (song: AudioData) => {
    // Pause current song
    handlePauseLofi()

    // Play newly selected song
    song.audio.play()

    // Update state
    setCurrentSong(song)
  }

  return (
    <div
      className={clsx(styles.mainWidget, {
        [styles.mainWidgetLightMode]: mode === MODE.LIGHT,
        [styles.mainWidgetDarkMode]: mode === MODE.DARK,
      })}
    >
      <LofiBeatsSection
        handleSongOptionClick={handleSongOptionClick}
        lofiSongsData={lofiSongsData}
        currentSong={currentSong.name}
        lofiDropdownRef={lofiDropdownRef}
      />
      <AtcStationsSection />
      <PlayButton handlePlayLofiAndAtc={handlePlayLofiAndAtc} />
    </div>
  )
}
