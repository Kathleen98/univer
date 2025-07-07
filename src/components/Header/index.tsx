import Image from "next/image"
import logo from '../../../public/logo-univer-branco.png'
import Link from "next/link"
import { AccountMenu } from "../AccountMenu"

export const Header = () => {
    return (
        <div className="bg-[#000210] flex items-center  py-2 px-5">
            <Image src={logo} width={100} height={100} alt="Logo Univer branco" />
            <div className="flex gap-5 mr-auto">
                <Link href={"#"} className="text-muted text-sm font-bold">Início</Link>
                <Link href={"#"} className="text-muted text-sm font-bold">Filmes</Link>
                <Link href={"#"} className="text-muted text-sm font-bold">Séries</Link>
                <Link href={"#"} className="text-muted text-sm font-bold">Kids</Link>
                <Link href={"#"} className="text-muted text-sm font-bold">Explorar</Link>
                <Link href={"#"} className="text-muted text-sm font-bold">Canais</Link>
            </div>
            <AccountMenu />
        </div>
    )
}