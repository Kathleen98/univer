import { ContentCarosel } from "@/components/ContentCarousel"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { ReadyMadeFilters } from "@/components/ReadyMadeFilters"
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

    return (
        <div className="bg-[#000210] flex flex-col">
            <Header />
            <Hero />
            <div className="flex flex-col gap-10 items-center justify-center  flex-wrap">

                <ReadyMadeFilters />

               <div className="flex flex-wrap gap-5 w-[95%]">
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

        </div>
    )


}

export default Home