import { useState } from 'react'
import { useLightDarkMode } from '../../hooks/useLightDarkMode'
import { VolumeSlider } from '../components/VolumeSlider'
import { MODE } from '../../constants/LightDarkMode'
import { AmbienceCategoryData, AudioData } from '../MainWidget'
import { ChevronDownIcon } from '../../assets/ChevronDownIcon'
import { FilledCheckIcon } from '../../assets/FilledCheckIcon'
import { AMBIENCE_CATEGORIES } from '../../constants/AmbienceCategories'

import BrownV1Audio from '../../assets/color-noise-audio/brownV1.mp3'
import BrownV2Audio from '../../assets/color-noise-audio/brownV2.mp3'
import BrownV3Audio from '../../assets/color-noise-audio/brownV3.mp3'
import GreyAudio from '../../assets/color-noise-audio/grey.mp3'
import PinkV1Audio from '../../assets/color-noise-audio/pinkV1.mp3'
import PinkV2Audio from '../../assets/color-noise-audio/pinkV2.mp3'
import WhiteV1Audio from '../../assets/color-noise-audio/whiteV1.mp3'

import CampfireFireAudio from '../../assets/nature-audio/campfire.mp3'
import CicadasAudio from '../../assets/nature-audio/cicadas.mp3'
import MarshAudio from '../../assets/nature-audio/marsh.mp3'
import MorningV1Audio from '../../assets/nature-audio/morning v1.mp3'
import NightV2Audio from '../../assets/nature-audio/nightv2.mp3'
import RainV1Audio from '../../assets/nature-audio/rainv1.mp3'
import StreamV2Audio from '../../assets/nature-audio/streamv2.mp3'
import WaterfallAudio from '../../assets/nature-audio/waterfall.mp3'
import WavesAudio from '../../assets/nature-audio/waves.mp3'
import WindAudio from '../../assets/nature-audio/wind.mp3'

import AcAudio from '../../assets/urban-audio/ac.mp3'
import ChatterV1Audio from '../../assets/urban-audio/chatterv1.mp3'
import ChatterV2Audio from '../../assets/urban-audio/chatterv2.mp3'
import FansAudio from '../../assets/urban-audio/fans.mp3'
import FryingAudio from '../../assets/urban-audio/frying.mp3'
import TrafficV1Audio from '../../assets/urban-audio/trafficv1.mp3'
import TrafficV2Audio from '../../assets/urban-audio/trafficv2.mp3'
import TrainsAudio from '../../assets/urban-audio/trains.mp3'

import styles from './AtcStationsSection.module.scss'
import clsx from 'clsx'

export const AtcStationsSection = ({
  handleAmbienceVolumeUpdate,
  handleAmbienceOptionClick,
  currentAmbience,
  currentAmbienceCategory,
  setAmbienceCategory,
  allAmbienceCategoriesData,
  setAllAmbienceCategoriesData,
}: {
  handleAmbienceVolumeUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAmbienceOptionClick: (atcStation: AudioData) => void
  currentAmbience: AudioData | null
  currentAmbienceCategory: AmbienceCategoryData
  setAmbienceCategory: React.Dispatch<
    React.SetStateAction<AmbienceCategoryData>
  >
  allAmbienceCategoriesData: AmbienceCategoryData[]
  setAllAmbienceCategoriesData: React.Dispatch<
    React.SetStateAction<AmbienceCategoryData[]>
  >
}) => {
  const { mode } = useLightDarkMode()
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(true)
  const toggleAmbienceCategoriesContainer = () => {
    setIsCategoriesVisible(!isCategoriesVisible)
  }
  const handleSwitchCategory = (categoryData: AmbienceCategoryData) => {
    const categoryName = categoryData.name
    const currentCategoryObj = allAmbienceCategoriesData.find(
      (categoryObj) => categoryObj.name === categoryName
    )
    const isAudioFetched = currentCategoryObj?.allAudio

    if (
      currentAmbienceCategory?.name !== categoryData.name &&
      !isAudioFetched
    ) {
      if (categoryData.name === AMBIENCE_CATEGORIES.COLOR_NOISE) {
        // create new category obj with new Audio elements
        const categoryDataWithAudio = {
          ...categoryData,
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
        }
        setAllAmbienceCategoriesData((prev) => {
          const newArr = prev.map((obj) => {
            if (obj.name === categoryName) {
              const newObj = { ...obj }
              newObj.allAudio = categoryDataWithAudio.allAudio
              return newObj
            }
            return obj
          })
          return newArr
        })
        setAmbienceCategory(categoryDataWithAudio)
      } else if (categoryData.name === AMBIENCE_CATEGORIES.NATURE) {
        const categoryDataWithAudio = {
          ...categoryData,
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
              name: 'Morning',
              audio: new Audio(MorningV1Audio),
            },
            { name: 'Night', audio: new Audio(NightV2Audio) },
            { name: 'Rain', audio: new Audio(RainV1Audio) },
            { name: 'Stream', audio: new Audio(StreamV2Audio) },
            { name: 'Waterfall', audio: new Audio(WaterfallAudio) },
            { name: 'Waves', audio: new Audio(WavesAudio) },
            { name: 'Wind', audio: new Audio(WindAudio) },
          ],
        }
        setAllAmbienceCategoriesData((prev) => {
          const newArr = prev.map((obj) => {
            if (obj.name === categoryName) {
              const newObj = { ...obj }
              newObj.allAudio = categoryDataWithAudio.allAudio
              return newObj
            }
            return obj
          })
          return newArr
        })
        setAmbienceCategory(categoryDataWithAudio)
      } else if (categoryData.name === AMBIENCE_CATEGORIES.URBAN) {
        const categoryDataWithAudio = {
          ...categoryData,
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
        }
        setAllAmbienceCategoriesData((prev) => {
          const newArr = prev.map((obj) => {
            if (obj.name === categoryName) {
              const newObj = { ...obj }
              newObj.allAudio = categoryDataWithAudio.allAudio
              return newObj
            }
            return obj
          })
          return newArr
        })
        setAmbienceCategory(categoryDataWithAudio)
      }
    } else {
      setAmbienceCategory(categoryData)
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerAndToggleContainer}>
          <h2
            className={clsx({
              [styles.titleLightMode]: mode === MODE.LIGHT,
              [styles.titleDarkMode]: mode === MODE.DARK,
            })}
          >
            {currentAmbienceCategory.name}
          </h2>
          <button
            onClick={toggleAmbienceCategoriesContainer}
            className={clsx(styles.ambiencesContainerToggle, {
              [styles.ambiencesContainerToggleDarkMode]: mode === MODE.DARK,
            })}
          >
            <ChevronDownIcon
              className={clsx(styles.chevronDownIcon, {
                [styles.chevronFlipped]: isCategoriesVisible,
              })}
            />
          </button>
        </div>
        <VolumeSlider
          currentAudio={currentAmbience}
          handleVolumeUpdate={handleAmbienceVolumeUpdate}
          defaultVolumeValue={
            currentAmbience ? currentAmbience.audio.volume * 100 : null
          }
        />
      </div>
      {isCategoriesVisible && (
        <div className={styles.ambienceCategoriesContainer}>
          {allAmbienceCategoriesData.map((category, i) => {
            return (
              <button
                key={`${category.name}-${i}`}
                className={styles.ambienceCategoryButton}
                onClick={() => handleSwitchCategory(category)}
              >
                <span>{category.name}</span>
                <img
                  src={category.imgSrc}
                  alt=''
                />
                {category.name === currentAmbienceCategory.name && (
                  <span className={styles.currentIconContainer}>
                    <FilledCheckIcon />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
      <div className={styles.stationButtonsContainer}>
        {currentAmbienceCategory?.allAudio?.map((station, i) => (
          <button
            key={`${station.name}-${i}`}
            className={clsx(styles.stationButton, {
              [styles.stationButtonDarkMode]: mode === MODE.DARK,
              [styles.activeButtonLightMode]:
                station.name === currentAmbience?.name && mode === MODE.LIGHT,
              [styles.activeButtonDarkMode]:
                station.name === currentAmbience?.name && mode === MODE.DARK,
            })}
            onClick={() => handleAmbienceOptionClick(station)}
          >
            {station.name}
          </button>
        ))}
      </div>
    </div>
  )
}
export default AtcStationsSection
