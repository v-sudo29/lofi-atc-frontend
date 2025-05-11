import { useEffect, useRef, useState } from 'react'
import atcRecording from './assets/atc-trimmed.mp3'
import lofiAudioOne from './assets/bento-box-love-letters.mp3'
import KofiIcon from './assets/KofiIcon'
import { MainWidget } from './components/MainWidget'
import LightDarkModeToggle from './components/LightDarkModeToggle'
import styles from './App.module.scss'

function App() {
  const [atcVolume, setAtcVolume] = useState<number | null>(null)

  // TODO: Remove once MVP is complete
  const isFirstDraftVisible = false

  const atcRef = useRef<HTMLAudioElement>(null)
  const lofiSongOne = useRef<HTMLAudioElement>(null)

  const handlePlayLofi = () => lofiSongOne.current?.play()
  const handlePlayAtc = () => atcRef.current?.play()
  const handlePauseAtc = () => atcRef.current?.pause()
  const handlePauseLofi = () => lofiSongOne.current?.pause()

  const increaseAtcVolume = () => {
    if (atcRef.current && atcRef.current.volume < 1) {
      atcRef.current.volume += 0.1
      setAtcVolume(atcRef.current.volume)
    }
  }

  const decreaseAtcVolume = () => {
    console.log(atcRef.current?.volume)
    if (atcRef.current && atcRef.current.volume > 0.1) {
      atcRef.current.volume -= 0.1
      setAtcVolume(atcRef.current.volume)
    }
    if (atcRef.current && atcRef.current.volume < 0.1) {
      atcRef.current.volume = 0
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number((e.target as HTMLInputElement).value)
    if (value && atcRef.current) {
      atcRef.current.volume = value / 100
      console.log(atcRef.current.volume)
    }
  }

  useEffect(() => {
    if (!atcRef.current) {
      atcRef.current = new Audio(atcRecording)
      setAtcVolume(atcRef.current.volume)
      console.log('ATC recording set!')
    }
    if (!lofiSongOne.current) {
      lofiSongOne.current = new Audio(lofiAudioOne)
      console.log('Lofi song set!')
    }
  }, [])

  // event listener to listen for when current song ends
  useEffect(() => {
    atcRef.current?.addEventListener('ended', handlePlayAtc)
    return () => atcRef.current?.removeEventListener('end', handlePlayAtc)
  }, [])

  // TODO: Remove once MVP is complete
  if (isFirstDraftVisible)
    return (
      <>
        <div>
          <button onClick={handlePlayAtc}>Play ATC</button>
          <button onClick={handlePauseAtc}>Pause ATC</button>
        </div>
        <div>
          <button onClick={handlePlayLofi}>Play Lofi</button>
          <button onClick={handlePauseLofi}>Pause Lofi</button>
        </div>
        <div>
          <p>Current volume: {atcVolume?.toFixed(1).toString()}</p>
        </div>
        <div>
          <p>ATC Volume Controls</p>
          <button onClick={increaseAtcVolume}>+</button>
          <button onClick={decreaseAtcVolume}>-</button>
        </div>
        <input
          type='range'
          min='1'
          max='100'
          onChange={(e) => handleVolumeChange(e)}
        ></input>
      </>
    )

  return (
    <>
      <header className={styles.header}>
        <h1>comfyatc.fm</h1>
        <div className={styles.kofiButtonContainer}>
          <button className={styles.kofiButton}>
            <KofiIcon />
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <MainWidget />
        <LightDarkModeToggle />
      </main>
    </>
  )
}

export default App
