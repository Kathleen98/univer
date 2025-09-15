import { ContentCarosel } from "@/components/ContentCarousel"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { getApiSSR } from "@/lib/axios/univer-api"
import { videosProps } from "@/type/videos"

const Home = async () => {

    const getVideos = async () => {
        try {
            const api = await getApiSSR()
            const response = await api.get(`/video`)

            const data = await response.data

            return data as videosProps

        } catch (e) {
            console.error(e)
        }
    }

    const videos = await getVideos()

    console.log(videos)


    return (
        <div className="bg-[#000210] flex flex-col">
            <Header />
            <Hero />
            <div className="flex gap-3  mx-auto my-3 flex-wrap">
                {videos?.map((content) => {
                return (
                    <ContentCarosel
                        key={content.id}
                        thumbnailUrl={content.thumbnailUrl}
                    />
                )
            })}
            </div>

        </div>
    )


}

export default Home