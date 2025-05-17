import { useEffect, useRef, useState } from 'react'
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
import atcBosAudio from '../assets/atcAudio/KBDL2-ZBW-ATH38-May-16-2025-0000Z-BOS.mp3'
import atcSfoAudio from '../assets/atcAudio/KSFO-Twr-May-13-2025-0000Z-SFO.mp3'
import atcLaxAudio from '../assets/atcAudio/KLAX-Gnd-May-16-2025-0000Z-LAX.mp3'
import atcPhxAudio from '../assets/atcAudio/KPHX-App-Satellite-May-16-2025-0000Z-PHX.mp3'
import atcSeaAudio from '../assets/atcAudio/KSEA3-Twr-East-May-16-2025-0000Z-SEA.mp3'
import atcJfkAudio from '../assets/atcAudio/KJFK-Twr-May-16-2025-0000Z-JFK.mp3'
import atcOrdAudio from '../assets/atcAudio/KORD1N2-App-133625-May-16-2025-0000Z-ORD.mp3'
import atcAtlAudio from '../assets/atcAudio/KATL-Twr-All-May-16-2025-0000Z-ATL.mp3'
import styles from './MainWidget.module.scss'
import clsx from 'clsx'

export interface AudioData {
  name: string
  audio: HTMLAudioElement
}

const lofiSongsData: AudioData[] = [
  { name: 'bento box love letters', audio: new Audio(lofiBentoBoxAudio) },
  { name: 'rainy season confessions', audio: new Audio(lofiRainySeasonAudio) },
  { name: 'pixel skies', audio: new Audio(lofiPixelSkiesAudio) },
  { name: 'night time blue light', audio: new Audio(lofiNightTimeAudio) },
  { name: 'sunset on the rooftop', audio: new Audio(lofiSunsetRooftopAudio) },
  {
    name: 'thinking of you wherever you are',
    audio: new Audio(lofiThinkingOfYouAudio),
  },
]

const atcAudioData: AudioData[] = [
  { name: 'BOS', audio: new Audio(atcBosAudio) },
  { name: 'SFO', audio: new Audio(atcSfoAudio) },
  { name: 'LAX', audio: new Audio(atcLaxAudio) },
  { name: 'PHX', audio: new Audio(atcPhxAudio) },
  { name: 'SEA', audio: new Audio(atcSeaAudio) },
  { name: 'JFK', audio: new Audio(atcJfkAudio) },
  { name: 'ORD', audio: new Audio(atcOrdAudio) },
  { name: 'ATL', audio: new Audio(atcAtlAudio) },
]

export const MainWidget = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState<AudioData>(lofiSongsData[0])
  const [currentAtc, setCurrentAtc] = useState<AudioData>(atcAudioData[0])
  const { mode } = useLightDarkMode()

  const lofiDropdownRef = useRef<HTMLSelectElement>(null)

  const handlePlayLofi = () => currentSong.audio.play()
  const handlePlayAtc = () => currentAtc.audio.play()
  const handlePauseLofi = () => currentSong.audio.pause()
  const handlePauseAtc = () => currentAtc.audio.pause()

  const handlePlayLofiAndAtc = () => {
    handlePlayLofi()
    handlePlayAtc()
    setIsAudioPlaying(true)
  }

  const handlePauseLofiAndAtc = () => {
    handlePauseLofi()
    handlePauseAtc()
    setIsAudioPlaying(false)
  }

  const handleSongOptionClick = (song: AudioData) => {
    // Pause current song
    handlePauseLofi()

    // If audio is currently playing, play newly selected song
    if (isAudioPlaying) song.audio.play()

    // Update state
    setCurrentSong(song)
  }

  const handleAtcOptionClick = (atcStation: AudioData) => {
    // Pause current atc station
    handlePauseAtc()

    // If audio is currently playing, play newly selected atc station
    if (isAudioPlaying) atcStation.audio.play()

    // Update state
    setCurrentAtc(atcStation)
  }

  const handleLofiVolumeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value) / 100
    if (newValue) currentSong.audio.volume = newValue
  }

  const handleAtcVolumeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value) / 100
    if (newValue) currentAtc.audio.volume = newValue
  }

  const handleRandomizeSong = () => {
    const randomIndex = Math.round(
      Number(Math.random()) * (lofiSongsData.length - 1)
    )

    if (isAudioPlaying) {
      handlePauseLofi()
      lofiSongsData[randomIndex].audio.currentTime = 0
      lofiSongsData[randomIndex].audio.play()
    }
    setCurrentSong(lofiSongsData[randomIndex])
  }

  const handlePlayNextSong = () => {
    let nextSongIndex = 0
    const lastIndex = lofiSongsData.length - 1

    lofiSongsData.find((song, i) => {
      if (song === currentSong && i !== lastIndex) {
        nextSongIndex = i + 1
      }
      if (song === currentSong && i === lastIndex) {
        nextSongIndex = 0
      }
    })
    lofiSongsData[nextSongIndex].audio.play()
    setCurrentSong(lofiSongsData[nextSongIndex])
  }

  const handlePlayNextAtc = () => {
    let nextAtcIndex = 0
    const lastIndex = atcAudioData.length - 1

    atcAudioData.find((audio, i) => {
      if (audio === currentAtc && i !== lastIndex) {
        nextAtcIndex = i + 1
      }
      if (audio === currentAtc && i === lastIndex) {
        nextAtcIndex = 0
      }
    })
    atcAudioData[nextAtcIndex].audio.play()
    setCurrentAtc(atcAudioData[nextAtcIndex])
  }

  // Event listener for when current song ends
  useEffect(() => {
    if (currentSong) {
      currentSong.audio.addEventListener('ended', handlePlayNextSong)
      return () =>
        currentSong.audio.removeEventListener('end', handlePlayNextSong)
    }
  }, [currentSong])

  // Event listener for when atc audio ends
  useEffect(() => {
    if (currentAtc) {
      currentAtc.audio.addEventListener('ended', handlePlayNextAtc)
      return () => currentAtc.audio.addEventListener('ended', handlePlayNextAtc)
    }
  }, [currentAtc])

  return (
    <div
      className={clsx(styles.mainWidget, {
        [styles.mainWidgetLightMode]: mode === MODE.LIGHT,
        [styles.mainWidgetDarkMode]: mode === MODE.DARK,
      })}
    >
      <LofiBeatsSection
        handleSongOptionClick={handleSongOptionClick}
        handleLofiVolumeUpdate={handleLofiVolumeUpdate}
        handleRandomizeSong={handleRandomizeSong}
        lofiSongsData={lofiSongsData}
        currentSong={currentSong}
        lofiDropdownRef={lofiDropdownRef}
      />
      <AtcStationsSection
        handleAtcVolumeUpdate={handleAtcVolumeUpdate}
        handleAtcOptionClick={handleAtcOptionClick}
        atcAudioData={atcAudioData}
        currentAtc={currentAtc}
      />
      <PlayButton
        handlePlayLofiAndAtc={handlePlayLofiAndAtc}
        handlePauseLofiAndAtc={handlePauseLofiAndAtc}
        isAudioPlaying={isAudioPlaying}
      />
    </div>
  )
}
