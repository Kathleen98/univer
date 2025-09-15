import { Card } from "../ui/card";
import Image from "next/image";

interface ContentCaroselProps {
    type?: 'continue' | 'default';
    thumbnailUrl: string
}

export const ContentCarosel = ({ type = 'default', thumbnailUrl }: ContentCaroselProps) => {


    return (
        <Card className={`${type === "continue" ? "w-[320px] h-[172px]" : "w-[360px]"}gap-1  p-0 bg-transparent border-none`} >
            <Image width={520} height={172} src={thumbnailUrl} alt="Banner Paulo" className={`${type === "continue" ? "w-[320px] h-[172px]" : "w-[360px] h-[208px]"} rounded-2xl`} />
        </Card>
    )
}