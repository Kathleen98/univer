import { ContentCarosel } from "@/components/ContentCarousel"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { ReadyMadeFilters } from "@/components/ReadyMadeFilters"
import { getApiSSR } from "@/lib/axios/univer-api"
import { videosProps } from "@/type/videos"
import { Instagram, Youtube } from "lucide-react"

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
            <main className="flex flex-col gap-10 items-center justify-center  flex-wrap">

                <ReadyMadeFilters />

                <div className="flex flex-wrap gap-5 w-[95%]">
                    {videos?.map((content) => {
                        return (
                            <ContentCarosel
                                key={content.id}
                                thumbnailUrl={content.thumbnailUrl}
                                slug={content.slug}
                                title={content.title}
                            />
                        )
                    })}
                </div>
            </main>

            <footer className="h-60 flex flex-col justify-center items-center p-10">
                <div className="flex gap-2 items-center">
                    <Instagram color="white" size={'1.4rem'} />
                    <Youtube color="white" size={'1.7rem'} />
                </div>
                <div className="flex gap-3">
                    <p>Central de ajuda </p>
                    <p>Pagamentos</p>
                    <p>Termos de uso</p>
                </div>
                <p className="text-white text-sm">&copy; Univer Videos - {new Date().getFullYear()}</p>
            </footer>

        </div>
    )


}

export default Home