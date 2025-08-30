import videojs from 'video.js';
import 'video.js/dist/video-js.css';

type VideoJsOptions = {
  autoplay: boolean;
  controls: boolean;
  sources: {
    src: string;
    type: string;
  }[];
};

const videoElement = document.getElementById('meu-player-ts');

if (videoElement) {
  const options: VideoJsOptions = {
    autoplay: false,
    controls: true,
    sources: [{
      src: 'url do video', 
      type: 'application/x-mpegURL'
    }]
  };


  const player = videojs(videoElement, options, () => {
    console.log('Player está pronto!');
  });

  const videoData = {
    intro: {
      start: 15,
      end: 25
    }
  }

  player.on('timeupdate', () => {
    const currentTime = player.currentTime()

  

}