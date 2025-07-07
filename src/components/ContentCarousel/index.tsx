import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Card, CardContent } from "../ui/card"
import bannerPaulo from '../../../public/paulo-banner.webp'
import Image from "next/image"
import continueBanner from '../../../public/paulo-continue.jpg'

interface ContentCaroselProps {
    title: string;
    type?: 'continue' | 'default'
}

export const ContentCarosel = ({ title, type = 'default' }: ContentCaroselProps) => {
    return (
        <div className="p-8">
            <p className="text-xl font-bold text-white pb-5">{title}</p>
            <Carousel>
                <CarouselContent>
                    {Array.from({ length: 29 }).map((_, index) => (
                        <CarouselItem key={index} className={`${type === "continue" ? "md:basis-1/4" : "md:basis-1/8"}`}>
                            <Card className={`${type === "continue" ? "w-[320px] h-[172px]" : "w-[160px]"}gap-1  p-0 bg-transparent border-none`} >
                                <Image src={type === "continue" ? continueBanner : bannerPaulo} alt="Banner Paulo" className={`${type === "continue" ? "w-[320px] h-[172px]" : "w-[160px] h-[208px]"} rounded-2xl`} />
                                {type === "continue" ?
                                    (
                                        <CardContent className="bg-transparent">
                                            <div className="flex">
                                                <p className="text-xs text-white">T2:E4</p>
                                                <p className="text-xs text-white">Nome do EP</p>
                                            </div>
                                        </CardContent>
                                    ) : null}
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
            </Carousel>
        </div>
    )
}