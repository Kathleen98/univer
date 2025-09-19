import Image from "next/image"
import { Card } from "../ui/card"
import { contents } from "@/type/videos"
import { CarouselItem } from "../ui/carousel"

interface NewContentProps {
  newsContent: contents
}

export const NewContent = ({ newsContent }: NewContentProps) => {
  return (
    <CarouselItem >
      <Card className="h-[760px] w-[450px] rounded-sm" >
        <Image src={newsContent.thumbnailUrl} alt='cartaz' width={450} height={760} />

      </Card>
    </CarouselItem>
  )
}