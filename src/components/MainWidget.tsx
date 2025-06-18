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
import lofiHaveANiceNightAudio from '../assets/lofiAudio/have-a-nice-night.mp3'
import lofiConvenientStoreAudio from '../assets/lofiAudio/late-night-convenient-store-runs.mp3'
import lofiSleepless7thAve from '../assets/lofiAudio/sleepless-on-7th-ave.mp3'
import lofiPinkClouds from '../assets/lofiAudio/pink-clouds-in-the-rearview.mp3'
import lofiCoffeeMidnightAudio from '../assets/lofiAudio/coffee-at-midnight.mp3'
import lofiCobblestoneAudio from '../assets/lofiAudio/cobblestone-reverie.mp3'
import lofiMoonlightAudio from '../assets/lofiAudio/moonlight-in-the-keep.mp3'

import atcBosAudio from '../assets/atcAudio/Jun-18-2025-BOS.mp3'
import atcSfoAudio from '../assets/atcAudio/Jun-17-2025-SFO.mp3'
import atcLaxAudio from '../assets/atcAudio/Jun-17-2025-LAX.mp3'
import atcPhxAudio from '../assets/atcAudio/Jun-17-2025-PHX.mp3'
import atcSeaAudio from '../assets/atcAudio/Jun-17-2025-SEA.mp3'
import atcJfkAudio from '../assets/atcAudio/Jun-17-2025-JFK.mp3'
import atcOrdAudio from '../assets/atcAudio/Jun-17-2025-ORD.mp3'
import atcAtlAudio from '../assets/atcAudio/Jun-17-2025-ATL.mp3'
import atcDenAudio from '../assets/atcAudio/Jun-17-2025-DEN.mp3'

import ColorNoiseImg from '../assets/images/color-noise.png'
import AmbienceOptionsImg from '../assets/images/atc-stations.png'
import NatureImg from '../assets/images/nature.png'
import UrbanImg from '../assets/images/urban.png'
import styles from './MainWidget.module.scss'
import clsx from 'clsx'
import { AMBIENCE_CATEGORIES } from '../constants/AmbienceCategories'

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
  { name: 'have a nice night', audio: new Audio(lofiHaveANiceNightAudio) },
  {
    name: 'late night convenient store runs',
    audio: new Audio(lofiConvenientStoreAudio),
  },
  {
    name: 'sleepless on 7th ave',
    audio: new Audio(lofiSleepless7thAve),
  },
  {
    name: 'pink clouds in the rearview',
    audio: new Audio(lofiPinkClouds),
  },
  {
    name: 'coffee at midnight',
    audio: new Audio(lofiCoffeeMidnightAudio),
  },
  { name: 'cobblestone reverie', audio: new Audio(lofiCobblestoneAudio) },
  { name: 'moonlight in the keep', audio: new Audio(lofiMoonlightAudio) },
]

export interface AmbienceCategoryData {
  name: string
  imgSrc: string
  allAudio: AudioData[] | null
}

const ambienceCategoriesData: AmbienceCategoryData[] = [
  {
    name: AMBIENCE_CATEGORIES.ATC_STATIONS,
    imgSrc: AmbienceOptionsImg,
    allAudio: [
      { name: 'BOS', audio: new Audio(atcBosAudio) },
      { name: 'SFO', audio: new Audio(atcSfoAudio) },
      { name: 'LAX', audio: new Audio(atcLaxAudio) },
      { name: 'PHX', audio: new Audio(atcPhxAudio) },
      { name: 'SEA', audio: new Audio(atcSeaAudio) },
      { name: 'JFK', audio: new Audio(atcJfkAudio) },
      { name: 'ORD', audio: new Audio(atcOrdAudio) },
      { name: 'ATL', audio: new Audio(atcAtlAudio) },
      { name: 'DEN', audio: new Audio(atcDenAudio) },
    ],
  },
  {
    name: AMBIENCE_CATEGORIES.COLOR_NOISE,
    imgSrc: ColorNoiseImg,
    allAudio: null, // starting value
  },
  {
    name: AMBIENCE_CATEGORIES.NATURE,
    imgSrc: NatureImg,
    allAudio: null, // starting value
  },
  {
    name: AMBIENCE_CATEGORIES.URBAN,
    imgSrc: UrbanImg,
    allAudio: null,
  },
]

const startingAmbience = ambienceCategoriesData.filter(
  (category) => category.name === AMBIENCE_CATEGORIES.ATC_STATIONS
)[0]

export const MainWidget = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [currentAmbienceCategory, setAmbienceCategory] =
    useState<AmbienceCategoryData>(startingAmbience)
  const [currentSong, setCurrentSong] = useState<AudioData>(lofiSongsData[0])
  const [currentAmbience, setCurrentAmbience] = useState<AudioData | null>(null)
  const [allAmbienceCategoriesData, setAllAmbienceCategoriesData] = useState<
    AmbienceCategoryData[]
  >(ambienceCategoriesData)
  const { mode } = useLightDarkMode()

  const lofiDropdownRef = useRef<HTMLSelectElement>(null)

  const handlePlayLofi = () => currentSong.audio.play()
  const handlePlayAmbience = () => currentAmbience?.audio.play()
  const handlePauseLofi = () => currentSong.audio.pause()
  const handlePauseAmbience = () => currentAmbience?.audio.pause()

  const handlePlayLofiAndAmbience = () => {
    handlePlayLofi()
    handlePlayAmbience()
    setIsAudioPlaying(true)
  }

  const handlePauseLofiAndAmbience = () => {
    handlePauseLofi()
    handlePauseAmbience()
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

  const handleAmbienceOptionClick = (ambienceOption: AudioData) => {
    // Pause current atc station
    handlePauseAmbience()

    // If audio is currently playing, play newly selected atc station
    if (isAudioPlaying) ambienceOption.audio.play()

    // Update state
    setCurrentAmbience(ambienceOption)
  }

  const handleLofiVolumeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value) / 100
    if (newValue) currentSong.audio.volume = newValue
  }

  const handleAmbienceVolumeUpdate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = Number(e.target.value) / 100
    if (newValue && currentAmbience) currentAmbience.audio.volume = newValue
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

  const handlePlayNextAmbience = () => {
    if (!currentAmbienceCategory.allAudio) return

    let nextAtcIndex = 0
    const lastIndex = currentAmbienceCategory.allAudio.length - 1

    currentAmbienceCategory.allAudio.find((audio, i) => {
      if (audio === currentAmbience && i !== lastIndex) {
        nextAtcIndex = i + 1
      }
      if (audio === currentAmbience && i === lastIndex) {
        nextAtcIndex = 0
      }
    })
    currentAmbienceCategory.allAudio[nextAtcIndex].audio.play()
    setCurrentAmbience(currentAmbienceCategory.allAudio[nextAtcIndex])
  }

  // Event listener for when current song ends
  useEffect(() => {
    if (currentSong) {
      currentSong.audio.addEventListener('ended', handlePlayNextSong)
      return () =>
        currentSong.audio.removeEventListener('end', handlePlayNextSong)
    }
  }, [currentSong])

  // Event listener for when ambience audio ends
  useEffect(() => {
    if (currentAmbience) {
      currentAmbience.audio.addEventListener('ended', handlePlayNextAmbience)
      return () =>
        currentAmbience.audio.addEventListener('ended', handlePlayNextAmbience)
    }
  }, [currentAmbience])

  // Set current ambience if it doesn't exist
  useEffect(() => {
    if (!currentAmbience && currentAmbienceCategory.allAudio) {
      setCurrentAmbience(currentAmbienceCategory.allAudio[0])
    }
  }, [currentAmbience])

  if (!ambienceCategoriesData) return
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
        handleAmbienceVolumeUpdate={handleAmbienceVolumeUpdate}
        handleAmbienceOptionClick={handleAmbienceOptionClick}
        currentAmbience={currentAmbience}
        currentAmbienceCategory={currentAmbienceCategory}
        setAmbienceCategory={setAmbienceCategory}
        allAmbienceCategoriesData={allAmbienceCategoriesData}
        setAllAmbienceCategoriesData={setAllAmbienceCategoriesData}
      />
      <PlayButton
        handlePlayLofiAndAmbience={handlePlayLofiAndAmbience}
        handlePauseLofiAndAmbience={handlePauseLofiAndAmbience}
        isAudioPlaying={isAudioPlaying}
      />
    </div>
  )
}
