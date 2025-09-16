'use client'
import { Play, Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";


interface ContentCaroselProps {
    type?: 'continue' | 'default';
    thumbnailUrl: string,
    slug: string
    title: string
}

export const ContentCarosel = ({ type = 'default', thumbnailUrl, slug, title }: ContentCaroselProps) => {


    return (
        <Card className={`${type === "continue" ? "w-[300px] h-[172px]" : "w-[360px]"} gap-0 group relative hover:z-30  p-0 bg-transparent border-none hover:scale-115 transition-all duration-300 `} >

            <Image width={320} height={172} src={thumbnailUrl} alt="Banner Paulo" className={`${type === "continue" ? "w-[180px] h-[172px]" : "w-[490px] h-[220px]"} rounded-sm hover:rounded-b-none`} />

            <CardContent className="bg-[#112337] absolute top-52 left-0 right-0  p-4  gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible  transition-all duration-300
        rounded-b-sm
        shadow-lg">
                <p className="text-white font-bold text-sm">{title}</p>
                <div className="flex gap-2 items-center">
                    <Link href={`/watch/${slug}`} className="rounded-4xl cursor-pointer p-3 bg-[#111929] hover:bg-[#315A83] transition-all duration-300 "><Play color="white" size='.9rem' /> </Link>
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
    )
}