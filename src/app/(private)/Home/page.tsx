import { ContentCarosel } from "@/components/ContentCarousel"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { getApiSSR } from "@/lib/axios/univer-api"
import { videosProps } from "@/type/videos"
import { redirect } from "next/navigation"

const Home = async () => {
   
    const getVideos = async () => {
        try{
            const api = await getApiSSR()
            const response = await api.get(`/videos`)

            const data = await response.data

            return data as videosProps
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(e : any ){
            if(e.response.status === 401){
                redirect('/sign-in')
            }
        }
    }

    const videos = await getVideos()


        return (
            <div className="bg-[#000210]">
                <Header />
                <Hero />
              {videos?.map((content) => {
                return(
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