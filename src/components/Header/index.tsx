'use client'
import Image from "next/image"
import logo from '../../../public/logo-univer-branco.png'
import Link from "next/link"
import { AccountMenu } from "../AccountMenu"
import { useScroll } from "@/hook/use-scroll"
import { cn } from '@/lib/utils'
import { SearchInput } from "../SearchInput"

export const Header = () => {
    const isScrolled = useScroll(50)
    return (
        <div className={cn(
            "flex items-center py-1 px-5 fixed top-0 left-0 right-0 z-50 transition-all ease-in-out duration-400",
            isScrolled
                ? "bg-black/80 backdrop-blur-sm"
                : "bg-transparent"
        )}>
            <Image src={logo} width={100} height={100} alt="Logo Univer branco" />
            <div className="flex gap-5 mr-auto">
                <Link href={"#"} className="text-muted text-sm font-bold">Início</Link>
                <Link href={"#"} className="text-muted text-sm font-bold">Filmes</Link>
                <Link href={"#"} className="text-muted text-sm font-bold">Séries</Link>
                <Link href={"#"} className="text-muted text-sm font-bold">Kids</Link>
                <Link href={"#"} className="text-muted text-sm font-bold">Explorar</Link>
                <Link href={"#"} className="text-muted text-sm font-bold">Canais</Link>
            </div>
            <div className="flex gap-4">
                <SearchInput />
                <AccountMenu />
            </div>
        </div>
    )
}