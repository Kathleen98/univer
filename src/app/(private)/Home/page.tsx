
import { ContentCarosel } from "@/components/ContentCarousel"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"

const Home = () => {
    return (
        <div className="bg-[#000210]">
            <Header />
            <Hero />
            <ContentCarosel title="Destaque" />
            <ContentCarosel title="Séries" />
            <ContentCarosel title="Filmes" />
            <ContentCarosel title="Novidade" />
            <ContentCarosel title="Continue assistindo" type="continue" />
            <ContentCarosel title="Para você" />
            <ContentCarosel title="Em alta" />
            <ContentCarosel title="Original Univer" />
            <ContentCarosel title="Documentário" />
        </div>
    )
}

export default Home