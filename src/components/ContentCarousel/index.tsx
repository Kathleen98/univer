'use client'
import { Play, Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { searchCategoryClientAPI } from "@/services/search-category-client";
import { contents, videosProps } from "@/type/videos";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";


interface ContentCaroselProps {
    initialVideos: videosProps | undefined
}

type GroupedContents = Record<contents['type'], contents[]> | undefined;

export const ContentCarosel = ({ initialVideos }: ContentCaroselProps) => {
    const searchParams = useSearchParams()
    const category = searchParams.get('category')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: searchCategory, isLoading } = useQuery({
        queryKey: ['search-category', category],
        queryFn: async () => await searchCategoryClientAPI(category as string),
        enabled: !!category,
    })

    const videoToShow = category ? searchCategory : initialVideos;

    const groupedContents: GroupedContents = videoToShow?.reduce<GroupedContents>((acc, content) => {
        if (acc) {
            if (!acc[content.type]) {
                acc[content.type] = [];
            }
            acc[content.type].push(content);
            return acc;
        }
    }, {} as GroupedContents);

    const translateTitleCAtegory = (title: string) => {
        switch (title) {
            case 'MOVIE':
                return 'Filmes'
            case 'SERIES':
                return 'Séries'
            case 'DOCUMENTARY':
                return 'Documentários'
            case 'ANIMATION':
                return 'Desenhos'
        }
    }


    return (
        groupedContents && Object.entries(groupedContents).length > 0 ? (
            <div className="flex flex-col gap-10">
                {Object.entries(groupedContents).map(([type, contents]) => (
                    <div key={type} className="flex flex-col gap-5">
                        <p className="text-white font-bold text-3xl" key={type}>{translateTitleCAtegory(type)}</p>

                        <Carousel opts={{ align: "start", loop: true }} className="z-1">
                            <CarouselContent className="z-1 ">

                                {contents.map((content) => (
                                    <CarouselItem key={content.id} className="basis-1/10" >
                                        <Card className={`${type === "continue" ? "w-[300px] h-[172px]" : "w-[360px]"} gap-0 group relative  p-0 bg-transparent border-none hover:scale-115 transition-all duration-300 `} >

                                            <Image width={320} height={172} src={content.thumbnailUrl} alt="Banner Paulo" className={`${type === "continue" ? "w-[180px] h-[172px]" : "w-[490px] h-[220px]"} z-1  rounded-sm hover:rounded-b-none`} />

                                            <CardContent className="bg-[#112337] absolute top-52 left-0 right-0  p-4 z-90 gap-2 opacity-0 invisible group-hover:z-90 group-hover:opacity-100 group-hover:visible  transition-all duration-300
        rounded-b-sm
        shadow-lg">
                                                <p className="text-white font-bold text-sm">{content.title}</p>
                                                <div className="flex gap-2 items-center">
                                                    <Link href={`/watch/${content.slug}`} className="rounded-4xl cursor-pointer p-3 bg-[#111929] hover:bg-[#315A83] transition-all duration-300 "><Play color="white" size='.9rem' /> </Link>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button className="rounded-4xl cursor-pointer hover:bg-[#315A83] transition-all duration-300"> <Plus /> </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Adicionar à lista</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <Badge className="rounde-md w-6 h-6 bg-green-700 text-white">L</Badge>
                                                </div>
                                                <div className="flex gap-3">
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

                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                )
                )}
            </div>
        ) : null
    );
}