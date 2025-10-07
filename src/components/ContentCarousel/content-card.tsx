import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import { CarouselItem } from "../ui/carousel"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { contents } from "@/type/videos"
import { Play, Plus } from "lucide-react"
import { ContentDetail } from "./content-details"
import { IndicativeClassification } from "../IndicativeClassification"

interface ContentCardProps {
  content: contents
}

export const ContentCard = ({ content }: ContentCardProps) => {
  return (
    <CarouselItem key={content.id} className="basis-1/11" >
      <Card className={` gap-0 group relative w-[360px] h-[220px] p-0 bg-transparent border-none hover:scale-115 transition-all duration-300 `} >

        <Image width={320} height={172} src={content.thumbnailUrl} alt="Banner Paulo" className={` z-1 w-[360px] h-[220px]   rounded-sm hover:rounded-b-none`} />

        <CardContent className="bg-[#112337] absolute top-52 left-0 right-0   p-4 z-90 gap-2 opacity-0 invisible group-hover:z-90 group-hover:opacity-100 group-hover:visible  transition-all duration-300 rounded-b-sm shadow-lg">
          <p className="text-white font-bold text-sm">{content.title}</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Link href={`/watch/${content.slug}`} className="rounded-4xl cursor-pointer p-3 bg-transparent hover:bg-transparent transition-all duration-300 "><Play color="white" size='.9rem' /> </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="rounded-4xl cursor-pointer bg-transparent hover:bg-transparent transition-all duration-300"> <Plus className="hover:text-[#315A83]" /> </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adicionar à lista</p>
                </TooltipContent>
              </Tooltip>
              <IndicativeClassification text={'L'} />
            </div>

            <div className="">
              <Tooltip>
                <TooltipTrigger asChild>
                  <ContentDetail />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ver mais</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="flex items-center gap-1">
              <div className="rounded-4xl w-1.5 h-1.5 bg-[#315A83]"></div>
              <p className="text-white text-sm">Comédia</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="rounded-4xl w-1.5 h-1.5 bg-[#315A83]"></div>
              <p className="text-white text-sm">Drama</p>
            </div>

          </div>
        </CardContent>
      </Card>
    </CarouselItem>
  )
}