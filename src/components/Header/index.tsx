'use client'
import Image from "next/image"
import logo from '../../../public/logo-univer-branco.png'
import { AccountMenu } from "../AccountMenu"
import { useScroll } from "@/hook/use-scroll"
import { cn } from '@/lib/utils'
import { SearchInput } from "../SearchInput"
import { Bell } from "lucide-react"
import { NavigateButton } from "../Navigate"

export const Header = () => {
    const isScrolled = useScroll(50)

    const menu = [
        { title: 'Início', params: '' },
        { title: 'Filmes', params: 'MOVIE' },
        { title: 'Séries', params: 'SERIES' },
        { title: 'Desenhos', params: 'ANIMATION' },
        { title: 'Explorar', params: 'DOCUMENTARY' }
    ]

    return (
        <div className={cn(
            "flex items-center py-1 px-5 fixed top-0 left-0 right-0 z-50 transition-all ease-in-out duration-400",
            isScrolled
                ? "bg-black/80 backdrop-blur-sm"
                : "bg-transparent"
        )}>
            <Image src={logo} width={100} height={100} alt="Logo Univer branco" />
            <div className="flex gap-5 mr-auto">
                {menu.map((item) => (
                    <NavigateButton key={item.params} title={item.title} params={item.params} />
                ))}
            </div>
            <div className="flex gap-4 items-center">
                <SearchInput />
                <Bell className="text-white" />
                <AccountMenu />
            </div>
        </div>
    )
}