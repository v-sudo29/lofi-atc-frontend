import { useState } from 'react'
import { useLightDarkMode } from '../../hooks/useLightDarkMode'
import { VolumeSlider } from '../components/VolumeSlider'
import { MODE } from '../../constants/LightDarkMode'
import { AmbienceCategoryData, AudioData } from '../MainWidget'
import { ChevronDownIcon } from '../../assets/ChevronDownIcon'
import styles from './AtcStationsSection.module.scss'
import clsx from 'clsx'
import { FilledCheckIcon } from '../../assets/FilledCheckIcon'

export const AtcStationsSection = ({
  handleAmbienceVolumeUpdate,
  handleAmbienceOptionClick,
  ambienceCategoriesData,
  currentAmbience,
  currentAmbienceCategory,
  setAmbienceCategory,
}: {
  handleAmbienceVolumeUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAmbienceOptionClick: (atcStation: AudioData) => void
  ambienceCategoriesData: AmbienceCategoryData[]
  currentAmbience: AudioData | null
  currentAmbienceCategory: AmbienceCategoryData
  setAmbienceCategory: React.Dispatch<
    React.SetStateAction<AmbienceCategoryData>
  >
}) => {
  const { mode } = useLightDarkMode()
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(true)
  const toggleAmbienceCategoriesContainer = () => {
    setIsCategoriesVisible(!isCategoriesVisible)
  }
  const handleSwitchCategory = (categoryData: AmbienceCategoryData) => {
    if (currentAmbienceCategory?.name !== categoryData.name) {
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
          {ambienceCategoriesData.map((category, i) => {
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
