import { ContentCarosel } from "@/components/ContentCarousel"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { getApiSSR } from "@/lib/axios/mocki-API"
import { videosProps } from "@/type/videos"
import { cookies } from "next/headers"

const Home = async () => {
   
    const getVideos = async () => {
        try{
            const api = await getApiSSR()
            const response = await api.get(`/videos`)

            if (response.status === 200) {
            // Salvar token nos cookies
            const { token } =  response.data
            const cookiesStore = await cookies()
            cookiesStore.set('auth-token', token, {
              
            })
            
     
        } else {
            throw new Error("Credenciais inválidas");
        }

            const data = response.data

            return data as videosProps
        }catch(e){
            console.log(`Erro no carregamento dos vídeos, ${e}`)
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