import { ContentCarosel } from "@/components/ContentCarousel"
import { ContentDetail } from "@/components/ContentDetail"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { ReadyMadeFilters } from "@/components/ReadyMadeFilters"
import { getApiSSR } from "@/lib/axios/univer-api"
import { videosProps } from "@/type/videos"
import { Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

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
    <div className="bg-[#000210] flex flex-col overflow-x-hidden">
      <Suspense fallback={<div>carregando...</div>}>
        <Header />
      </Suspense>
      <Hero />
      <main className="flex flex-col gap-10 items-center justify-center  flex-wrap">

        <ReadyMadeFilters />

        <div className="flex flex-wrap gap-5 w-[96%]">
          <ContentCarosel
            initialVideos={videos}
          />
        </div>

        <ContentDetail />
      </main>

      <footer className="h-60 flex flex-col justify-center items-center p-10">
        <div className="flex gap-2 items-center">
          <Instagram color="white" strokeWidth={1} size={'1.4rem'} />
          <Youtube color="white" strokeWidth={1} size={'1.7rem'} />
        </div>
        <div className="flex gap-3 p-5">
          <Link href={'#'} className="text-muted-foreground text-sm hover:underline underline-offset-4">Central de ajuda </Link>
          <Link href={'#'} className="text-muted-foreground text-sm hover:underline underline-offset-4">Pagamentos</Link>
          <Link href={'#'} className="text-muted-foreground text-sm hover:underline underline-offset-4">Termos de uso</Link>
        </div>
        <p className="text-muted-foreground text-sm">&copy; Univer Videos - {new Date().getFullYear()}</p>
      </footer>

    </div>
  )


}

export default Home