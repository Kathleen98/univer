'use client'
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { searchCategoryClientAPI } from "@/services/search-category-client";
import { contents, videosProps } from "@/type/videos";
import { Carousel, CarouselContent } from "../ui/carousel";
import { ContentCard } from "./content-card";
import { NewContent } from "../newContent";


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
            case 'NEW':
                return 'Novidades'
        }
    }


    return (
        groupedContents && Object.entries(groupedContents).length > 0 ? (
            <div className="flex flex-col gap-10">
                {Object.entries(groupedContents).map(([type, contents], index) => {
                    const filterCategory = contents.filter((item) => item.type !== 'NEW')
                    const filterNewsContents = contents.filter((news) => news.type === 'NEW')
                    console.log(filterNewsContents)
                    return (

                        <div key={index}>
                            <div className="flex flex-col gap-14">
                                <p className="text-white font-bold text-3xl">{translateTitleCAtegory(type)}</p>

                                <Carousel opts={{ align: "start", loop: true }} className="">
                                    <CarouselContent className="">
                                        {filterCategory.map((content) => (
                                            <ContentCard key={content.id} content={content} />
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            </div>

                            <div className="flex flex-col gap-5">


                                <Carousel opts={{ align: "start", loop: true }} className="">
                                    <CarouselContent className="">
                                        {filterNewsContents.map((newsContent) => (
                                            <NewContent key={newsContent.id} newsContent={newsContent} />
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            </div>
                        </div>

                    )
                }
                )}
            </div>
        ) : null
    );
}