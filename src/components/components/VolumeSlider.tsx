import { useEffect, useRef, useState } from 'react'
import { VolumeIcon } from '../../assets/VolumeIcon'
import { useLightDarkMode } from '../../hooks/useLightDarkMode'
import { MODE } from '../../constants/LightDarkMode'
import { MutedVolumeIcon } from '../../assets/MutedVolumeIcon'
import { AudioData } from '../MainWidget'
import styles from './VolumeSlider.module.scss'
import clsx from 'clsx'

export const VolumeSlider = ({
  currentAudio,
  handleVolumeUpdate,
  defaultVolumeValue,
}: {
  currentAudio: AudioData | null
  handleVolumeUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void
  defaultVolumeValue: number | null
}) => {
  const [isMuted, setIsMuted] = useState(
    currentAudio ? currentAudio.audio.volume <= 0.01 : false
  )
  const { mode } = useLightDarkMode()
  const volumeSlideRef = useRef<HTMLInputElement>(null)

  const handleMuted = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value) / 100
    if (newValue <= 0.01) setIsMuted(true)
    else setIsMuted(false)
  }

  const toggleMuteVolume = () => {
    if (!isMuted && currentAudio && volumeSlideRef.current) {
      currentAudio.audio.volume = 0
      volumeSlideRef.current.value = '0'
      setIsMuted(true)
    } else if (isMuted && currentAudio && volumeSlideRef.current) {
      currentAudio.audio.volume = 0.5
      volumeSlideRef.current.value = '50'
      setIsMuted(false)
    }
  }

  const handleThumbLeftSpaceColoring = () => {
    if (volumeSlideRef.current) {
      const modeLeftColor = mode === MODE.LIGHT ? 'black' : '#e4e4e4'
      const modeRightColor = mode === MODE.LIGHT ? '#e6e6e6' : '#4f4f4f'

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
      slider.style.background = `linear-gradient(to right, ${modeLeftColor} 0%, ${modeLeftColor} ${adjustedPercent}%, ${modeRightColor} ${adjustedPercent}%, ${modeRightColor} 100%)`
    }
  }

  /**
   * On load - set volume slider left coloring
   */
  useEffect(() => {
    if (volumeSlideRef.current) handleThumbLeftSpaceColoring()
  }, [mode])

  return (
    <div className={styles.volumeSlider}>
      <button
        onClick={() => {
          toggleMuteVolume()
          handleThumbLeftSpaceColoring()
        }}
        className={clsx(styles.volumeIconContainer, {
          [styles.volumeIconContainerLightMode]: mode === MODE.LIGHT,
          [styles.volumeIconContainerDarkMode]: mode === MODE.DARK,
        })}
      >
        {isMuted ? <MutedVolumeIcon /> : <VolumeIcon />}
      </button>
      <input
        ref={volumeSlideRef}
        className={clsx(styles.volumeSlider, {
          [styles.volumeSliderDarkMode]: mode === MODE.DARK,
        })}
        defaultValue={defaultVolumeValue ?? 100}
        type='range'
        min='1'
        max='100'
        onChange={(e) => {
          handleThumbLeftSpaceColoring()
          handleVolumeUpdate(e)
          handleMuted(e)
        }}
      ></input>
    </div>
  )
}
