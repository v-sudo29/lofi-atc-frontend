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

import atcBosAudio from '../assets/atcAudio/May-23-2025-BOS.mp3'
import atcSfoAudio from '../assets/atcAudio/May-23-2025-SFO.mp3'
import atcLaxAudio from '../assets/atcAudio/May-23-2025-LAX.mp3'
import atcPhxAudio from '../assets/atcAudio/May-23-2025-PHX.mp3'
import atcSeaAudio from '../assets/atcAudio/May-23-2025-SEA.mp3'
import atcJfkAudio from '../assets/atcAudio/May-23-2025-JFK.mp3'
import atcOrdAudio from '../assets/atcAudio/May-23-2025-ORD.mp3'
import atcAtlAudio from '../assets/atcAudio/May-23-2025-ATL.mp3'
import atcDenAudio from '../assets/atcAudio/May-23-2025-DEN.mp3'

import BrownV1Audio from '../assets/color-noise-audio/brownV1.mp3'
import BrownV2Audio from '../assets/color-noise-audio/brownV2.mp3'
import BrownV3Audio from '../assets/color-noise-audio/brownV3.mp3'
import GreyAudio from '../assets/color-noise-audio/grey.mp3'
import PinkV1Audio from '../assets/color-noise-audio/pinkV1.mp3'
import PinkV2Audio from '../assets/color-noise-audio/pinkV2.mp3'
import WhiteV1Audio from '../assets/color-noise-audio/whiteV1.mp3'

import CampfireFireAudio from '../assets/nature-audio/campfire.mp3'
import CicadasAudio from '../assets/nature-audio/cicadas.mp3'
import MarshAudio from '../assets/nature-audio/marsh.mp3'
import MorningV1Audio from '../assets/nature-audio/morning v1.mp3'
import MorningV2Audio from '../assets/nature-audio/morning v2.mp3'
import NightV1Audio from '../assets/nature-audio/nightv1.mp3'
import NightV2Audio from '../assets/nature-audio/nightv2.mp3'
import RainV1Audio from '../assets/nature-audio/rainv1.mp3'
import RainV2Audio from '../assets/nature-audio/rainv2.mp3'
import StreamV1Audio from '../assets/nature-audio/streamv1.mp3'
import StreamV2Audio from '../assets/nature-audio/streamv2.mp3'
import ThunderV1Audio from '../assets/nature-audio/thunderv1.mp3'
import ThunderV2Audio from '../assets/nature-audio/thunderv2.mp3'
import WaterfallAudio from '../assets/nature-audio/waterfall.mp3'
import WavesAudio from '../assets/nature-audio/waves.mp3'
import WindAudio from '../assets/nature-audio/wind.mp3'

import AcAudio from '../assets/urban-audio/ac.mp3'
import ChatterV1Audio from '../assets/urban-audio/chatterv1.mp3'
import ChatterV2Audio from '../assets/urban-audio/chatterv2.mp3'
import FansAudio from '../assets/urban-audio/fans.mp3'
import FryingAudio from '../assets/urban-audio/frying.mp3'
import TrafficV1Audio from '../assets/urban-audio/trafficv1.mp3'
import TrafficV2Audio from '../assets/urban-audio/trafficv2.mp3'
import TrainsAudio from '../assets/urban-audio/trains.mp3'

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
  allAudio: AudioData[]
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
    allAudio: [
      {
        name: 'Brown V1',
        audio: new Audio(BrownV1Audio),
      },
      {
        name: 'Brown V2',
        audio: new Audio(BrownV2Audio),
      },
      {
        name: 'Brown V3',
        audio: new Audio(BrownV3Audio),
      },
      {
        name: 'Grey',
        audio: new Audio(GreyAudio),
      },
      {
        name: 'Pink V1',
        audio: new Audio(PinkV1Audio),
      },
      {
        name: 'Pink V2',
        audio: new Audio(PinkV2Audio),
      },
      {
        name: 'White V1',
        audio: new Audio(WhiteV1Audio),
      },
    ],
  },
  {
    name: AMBIENCE_CATEGORIES.NATURE,
    imgSrc: NatureImg,
    allAudio: [
      {
        name: 'Campfire',
        audio: new Audio(CampfireFireAudio),
      },
      {
        name: 'Cicadas',
        audio: new Audio(CicadasAudio),
      },
      {
        name: 'Marsh',
        audio: new Audio(MarshAudio),
      },
      {
        name: 'Morning V1',
        audio: new Audio(MorningV1Audio),
      },
      {
        name: 'Morning V2',
        audio: new Audio(MorningV2Audio),
      },
      { name: 'Night V1', audio: new Audio(NightV1Audio) },
      { name: 'Night V2', audio: new Audio(NightV2Audio) },
      { name: 'Rain V1', audio: new Audio(RainV1Audio) },
      { name: 'Rain V2', audio: new Audio(RainV2Audio) },
      { name: 'Stream V1', audio: new Audio(StreamV1Audio) },
      { name: 'Stream V2', audio: new Audio(StreamV2Audio) },
      { name: 'Thunder V1', audio: new Audio(ThunderV1Audio) },
      { name: 'Thunder V2', audio: new Audio(ThunderV2Audio) },
      { name: 'Waterfall', audio: new Audio(WaterfallAudio) },
      { name: 'Waves', audio: new Audio(WavesAudio) },
      { name: 'Wind', audio: new Audio(WindAudio) },
    ],
  },
  {
    name: AMBIENCE_CATEGORIES.URBAN,
    imgSrc: UrbanImg,
    allAudio: [
      {
        name: 'AC',
        audio: new Audio(AcAudio),
      },
      {
        name: 'Chatter V1',
        audio: new Audio(ChatterV1Audio),
      },
      {
        name: 'Chatter V2',
        audio: new Audio(ChatterV2Audio),
      },
      {
        name: 'Fans',
        audio: new Audio(FansAudio),
      },
      {
        name: 'Frying',
        audio: new Audio(FryingAudio),
      },
      {
        name: 'Traffic V1',
        audio: new Audio(TrafficV1Audio),
      },
      {
        name: 'Traffic V2',
        audio: new Audio(TrafficV2Audio),
      },
      {
        name: 'Trains',
        audio: new Audio(TrainsAudio),
      },
    ],
  },
]

const startingAmbience = ambienceCategoriesData.filter(
  (category) => category.name === AMBIENCE_CATEGORIES.ATC_STATIONS
)[0]

export const MainWidget = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [currentAmbienceCategory, setAmbienceCategory] =
    useState(startingAmbience)
  const [currentSong, setCurrentSong] = useState<AudioData>(lofiSongsData[0])
  const [currentAmbience, setCurrentAmbience] = useState<AudioData>(
    currentAmbienceCategory.allAudio[0]
  )
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
    if (!currentAmbienceCategory) return

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
        ambienceCategoriesData={ambienceCategoriesData}
        currentAmbience={currentAmbience}
        currentAmbienceCategory={currentAmbienceCategory}
        setAmbienceCategory={setAmbienceCategory}
      />
      <PlayButton
        handlePlayLofiAndAmbience={handlePlayLofiAndAmbience}
        handlePauseLofiAndAmbience={handlePauseLofiAndAmbience}
        isAudioPlaying={isAudioPlaying}
      />
    </div>
  )
}
