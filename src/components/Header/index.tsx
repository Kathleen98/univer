'use client'
import Image from "next/image"
import logo from '../../../public/logo-univer-branco.png'
import { AccountMenu } from "../AccountMenu"
import { useScroll } from "@/hook/use-scroll"
import { cn } from '@/lib/utils'
import { SearchInput } from "../SearchInput"
import { Button } from "../ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const Header = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const isScrolled = useScroll(50)

    const handleChangeParams = (category?: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (category) {
            params.set('category', category)
        } else {
            params.delete('category')
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className={cn(
            "flex items-center py-1 px-5 fixed top-0 left-0 right-0 z-50 transition-all ease-in-out duration-400",
            isScrolled
                ? "bg-black/80 backdrop-blur-sm"
                : "bg-transparent"
        )}>
            <Image src={logo} width={100} height={100} alt="Logo Univer branco" />
            <div className="flex gap-5 mr-auto">
                <Button onClick={() => handleChangeParams()} className="text-muted text-sm font-bold bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">Início</Button>
                <Button onClick={() => handleChangeParams('MOVIE')} className="text-muted text-sm font-bold bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">Filmes</Button>
                <Button onClick={() => handleChangeParams('SERIES')} className="text-muted text-sm font-bold bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">Séries</Button>
                <Button onClick={() => handleChangeParams('ANIMATION')} className="text-muted text-sm font-bold bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">Kids</Button>
                <Button onClick={() => handleChangeParams('DOCUMENTARY')} className="text-muted text-sm font-bold bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">Explorar</Button>
                <Button onClick={() => handleChangeParams()} className="text-muted text-sm font-bold bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">Canais</Button>
                <Button onClick={() => handleChangeParams()} className="text-muted text-sm font-bold bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">Ao vivo</Button>
                <Button onClick={() => handleChangeParams()} className="text-muted text-sm font-bold bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">Meditação</Button>
                <Button onClick={() => handleChangeParams()} className="text-muted text-sm font-bold bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">Reuniões</Button>
                <Button onClick={() => handleChangeParams()} className="text-muted text-sm font-bold bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">Programas</Button>

            </div>
            <div className="flex gap-4">
                <SearchInput />
                <AccountMenu />
            </div>
        </div>
    )
}