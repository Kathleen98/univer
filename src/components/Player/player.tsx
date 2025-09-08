'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { Fullscreen, MessageSquareText, Pause, Play, Volume2 } from "lucide-react"

export const CustomPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  // const [volume, setVolume] = useState(1)
  // const [isMuted, setIsMuted] = useState(false)
  // const [isFullscreen, setIsFullscreen] = useState(false)

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

  // const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const video = videoRef.current

  //   if (!video) return

  //   const newVolume = Number(e.target.value)
  //   video.volume = newVolume
  //   setVolume(newVolume)
  //   if (newVolume > 0) {
  //     video.muted = false
  //     setIsMuted(false)
  //   }
  // }


  return (
    <div className="w-full h-screen relative">
      <video ref={videoRef} controls={false} src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" className={`w-full h-screen`} />
      <div className={`absolute bottom-0 left-5 right-5 flex flex-col gap-2`}>
        <div className="flex justify-between">
          <Button className="cursor-pointer bg-transparent  ">
            <Volume2 color="white" />
          </Button>
        <Button onClick={togglePlayPause} className="cursor-pointer bg-transparent w-[6rem] mx-auto">
          {!isPlaying ? <Play color="white" size={'1.5rem'} /> : <Pause color="white" size={'1.2rem'} />}
        </Button>

        <div className="flex gap-2 items-center">
          <Button className="cursor-pointer bg-transparent  ">
          <MessageSquareText color="white"  />
        </Button>
        <Button className="cursor-pointer bg-transparent  "><Fullscreen color="white" /></Button>
        </div>
        </div>
        <input type="range" min={"0"} max={duration} value={progress} onChange={handleProgressChange} />
        <span>{new Date(progress * 1000).toISOString().substr(14, 5)}</span>
      </div>
    </div>
  )
}