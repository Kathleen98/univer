'use client'

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { Fullscreen, MessageSquareText, Minimize, Pause, Play, Volume2, VolumeOff } from "lucide-react"
import style from './index.module.css'

export const CustomPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerWrapperRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(5)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)


  const togglePlayPause = () => {
    const video = videoRef.current

    if (!video) return

    if (isPlaying) {
      video.pause();
      setIsPlaying(false)
    } else {
      video.play();
      setIsPlaying(true)
    }
  }

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current

    if (!video) return

    const newTime = Number(e.target.value);
    video.currentTime = newTime
    setProgress(newTime)
  }

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current

    if (!video) return

    const newVolume = Number(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)
    if (newVolume > 0) {
      video.muted = false
      setIsMuted(false)
    }
  }

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return

    const newMuteedState = !video.muted
    video.muted = newMuteedState
    setIsMuted(newMuteedState)

  }, [])


  const toggleFullscreen = useCallback(() => {
    const playerWrapper = playerWrapperRef.current
    if (!playerWrapper) return

    if (!document.fullscreenElement) {
      playerWrapper.requestFullscreen().catch(error => console.error(error))
    } else {
      document.exitFullscreen();
    }

  }, [])


  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => setProgress(video.currentTime)
    const setVideoDuration = () => setDuration(video.duration)

    video.addEventListener('loadedmetadata', setVideoDuration)
    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('play', () => setIsPlaying(true))
    video.addEventListener('pause', () => setIsPlaying(false))

    return () => {
      video.removeEventListener('loadedmetadata', setVideoDuration)
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('play', () => setIsPlaying(true))
      video.removeEventListener('pause', () => setIsPlaying(false))
    }

  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  console.log(progress)
   console.log(progress)

  return (
    <div className="w-full h-screen relative" ref={playerWrapperRef}>
      <video ref={videoRef} controls={false} src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" className={`w-full h-screen`} />
      <div className={`absolute bottom-0 left-5 right-5 flex flex-col gap-2`}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 group/volume">
            <Button onClick={toggleMute} className={`cursor-pointer bg-transparent relative ${style.buttonInputVolume}`}>
              {isMuted || volume === 0 ?  <VolumeOff />:  <Volume2 /> }
            </Button>
            <input
              onChange={handleVolumeChange}
              value={volume}
              min="0"
              max="100"
              type="range"
              className={` w-0 group-hover/volume:w-[80px] transition-all] ${style.inputVolume}`} />
          </div>
          <Button onClick={togglePlayPause} className="cursor-pointer bg-transparent w-[6rem] mx-auto">
            {!isPlaying ? <Play color="white" size={'1.5rem'} /> : <Pause color="white" size={'1.2rem'} />}
          </Button>

          <div className="flex gap-2 items-center">
            <Button className="cursor-pointer bg-transparent  ">
              <MessageSquareText color="white" />
            </Button>
            <Button onClick={toggleFullscreen} className="cursor-pointer bg-transparent  ">{!isFullscreen ? <Fullscreen color="white" /> : <Minimize />}</Button>
          </div>
        </div>
        <input type="range" min={"0"} max={duration} value={progress} onChange={handleProgressChange} />
        <span>{new Date(progress * 1000).toISOString().substr(14, 5)}</span>
      </div>
    </div>
  )
}