
import { CustomPlayer } from "@/components/Player/player"
import { univerAPI } from "@/lib/axios/mocki-API"
import { Movie } from "@/type/movie"

const PlayerPage = async () => {

  const findVideoPlayer = async () => {
    try {

      const response = await univerAPI.post(`/videos/filter/a-origem`)

      const data = await response.data

      return data as Movie

    } catch (e) {
      console.error(`Erro ao carregar as informações do vídeo ${e}`)
    }
  }

  const data = await findVideoPlayer()
  console.log(data)

  return (
    <div className={`w-screen h-screen bg-black flex justify-center items-center`}>
      <div className={`w-full h-full bg-black`}>
        <CustomPlayer />
      </div>
    </div>
  )
}

export default PlayerPage