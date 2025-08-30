import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Card } from "../ui/card"
import Image from "next/image"
import { BaseContent } from "@/type/content"

interface ContentCaroselProps {
    title: string;
    type?: 'continue' | 'default';
    content?: BaseContent[] | undefined
}

export const ContentCarosel = ({ title, type = 'default', content }: ContentCaroselProps) => {
    const url = "https://placehold.co/600x400"
    return (
        <div className="p-8">
            <p className="text-xl font-bold text-white pb-5">{title}</p>
            <Carousel>
                <CarouselContent>
                    {
                        content?.map((cont) => (
                            <CarouselItem key={cont.id} className={`${type === "continue" ? "md:basis-1/4" : "md:basis-1/8"}`}>
                                <Card className={`${type === "continue" ? "w-[320px] h-[172px]" : "w-[160px]"}gap-1  p-0 bg-transparent border-none`} >
                                    <Image width={320} height={172} src={url} alt="Banner Paulo" className={`${type === "continue" ? "w-[320px] h-[172px]" : "w-[160px] h-[208px]"} rounded-2xl`} />
                                </Card>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
            </Carousel>
        </div>
    )
}