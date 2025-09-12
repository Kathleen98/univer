import { ContentCarosel } from "@/components/ContentCarousel"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { getApiSSR } from "@/lib/axios/univer-api"
import { videosProps } from "@/type/videos"

const Home = async () => {

    const getVideos = async () => {
        try {
            const api = await getApiSSR()
            const response = await api.get(`/videos`)

            const data = await response.data

            return data as videosProps

        } catch (e) {
            console.error(e)
        }
    }

    const videos = await getVideos()


    return (
        <div className="bg-[#000210]">
            <Header />
            <Hero />
            {videos?.map((content) => {
                return (
                    <ContentCarosel
                        key={content.id}
                        title={content.title}

                    />
                )
            })}

        </div>
    )


}

export default Home