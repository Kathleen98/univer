
import { CustomPlayer } from "@/components/Player/player"
import { getApiSSR } from "@/lib/axios/univer-api"
import { Movie } from "@/type/movie"

const PlayerPage = async () => {

  const findVideoPlayer = async () => {
    "use server"
    try {
      const api = await getApiSSR()
      const response = await api.post(`/videos/filter/a-origem`)

      const data = await response.data

      return data as Movie
    } catch (e) {
        console.error(e)
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