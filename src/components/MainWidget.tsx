import { useEffect, useRef } from 'react'
import VolumeIcon from '../assets/VolumeIcon'
import styles from './MainWidget.module.scss'

export const MainWidget = () => {
  const volumeSlideRef = useRef<HTMLInputElement>(null)

  const handleThumbLeftSpaceColoring = () => {
    if (volumeSlideRef.current) {
      const slider = volumeSlideRef.current
      const min = Number(slider.min)
      const max = Number(slider.max)
      const value = Number(slider.value)
      const percent = ((value - min) / (max - min)) * 100
      let adjustedPercent

      if (value >= 0 && value < 12)
        adjustedPercent = Math.min(percent + 5.5, 100)
      else if (value >= 12 && value < 33)
        adjustedPercent = Math.min(percent + 3.3, 100)
      else if (value >= 33 && value < 47)
        adjustedPercent = Math.min(percent + 1.5, 100)
      else if (value >= 47 && value < 60)
        adjustedPercent = Math.min(percent - 0.2, 100)
      else if (value >= 60 && value < 70)
        adjustedPercent = Math.min(percent - 1.7, 100)
      else if (value >= 70 && value <= 80)
        adjustedPercent = Math.min(percent - 3, 100)
      else if (value >= 80 && value <= 90)
        adjustedPercent = Math.min(percent - 4.5, 100)
      else if (value >= 90 && value <= 100)
        adjustedPercent = Math.min(percent - 5.7, 100)
      slider.style.background = `linear-gradient(to right, black 0%, black ${adjustedPercent}%, #e6e6e6 ${adjustedPercent}%, #e6e6e6 100%)`
    }
  }

  // on load, set volume slider left coloring
  useEffect(() => {
    if (volumeSlideRef.current) handleThumbLeftSpaceColoring()
  }, [])

  return (
    <div className={styles.mainWidget}>
      {/* Lofi Beats Section */}
      <div className={styles.lofiBeatsSection}>
        <div className={styles.lofiBeatsHeader}>
          <h2>Lofi Beats</h2>
          <div className={styles.volumeSliderComponent}>
            <div className={styles.volumeIconContainer}>
              <VolumeIcon />
            </div>
            <input
              ref={volumeSlideRef}
              className={styles.volumeSlider}
              type='range'
              min='1'
              max='100'
              onChange={handleThumbLeftSpaceColoring}
            ></input>
          </div>
        </div>
      </div>
    </div>
  )
}
