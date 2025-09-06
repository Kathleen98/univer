'use client'

import { useState, useEffect, useRef } from "react"
import videojs from "video.js"
import Player from "video.js/dist/types/player";
import 'video.js/dist/video-js.css'

interface VideoProps {
  manifestUrl: string;
  posterUrl: string;
  intro: {
    start: number;
    end: number;
  }
}

interface VideoPlayerProps {
  videoData: VideoProps
}

export const VideosPlayer = ({ videoData }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<Player | null>(null);
  const [showSkipButton, setShowSlikpButton] = useState(false);

  useEffect(() => {

    if (videoRef.current && !playerRef.current) {
      const player = videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: videoData.manifestUrl,
          type: 'application/x-mpegURL'
        }]
      })

      playerRef.current = player

      player.on('timeupdate', () => {
        const currentTime = player.currentTime() || 0

        if (currentTime >= videoData.intro.start && currentTime < videoData.intro.end) {
          setShowSlikpButton(true);
        } else {
          setShowSlikpButton(false)
        }
      })

      return () => {
        if (playerRef.current && !playerRef.current.isDisposed()) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      }
    }
  }, [videoData]

  )

  const handleSkipIntro = () => {
    if (playerRef.current) {
      playerRef.current.currentTime(videoData.intro.end);
      setShowSlikpButton(false)
    }
  }

  return(
    <div>
      <div className="relative">
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>

       {showSkipButton && (
        <button 
          onClick={handleSkipIntro} 
          className="absolute bottom-12 right-5 bg-black bg-opacity-70 text-white px-4 py-2 rounded cursor-pointer z-10"
          // Usando classes do TailwindCSS como exemplo para estilização
        >
          Pular Introdução
        </button>
      )}
    </div>
  )

}