import Link from "next/link"

interface ListMenuProps {
    dropdownMenu: boolean;
}

export const ListMenu = ({ dropdownMenu }: ListMenuProps) => {
    return (
        <div className={`absolute text-start top-10 rounded-md p-5 gap-4 bg-[#1f1d1d] right-0 flex flex-col ${dropdownMenu ? 'flex' : 'hidden'}`}>
            <Link className="border-b-1 border-transparent underline-offset-5 hover:underline" href={"#"}>Gerenciar perfil</Link>
            <Link className="border-b-1 border-transparent underline-offset-5 hover:underline" href={"#"}>Conta</Link>
            <Link className="border-b-1 border-transparent underline-offset-5 hover:underline" href={"#"}>Central de ajuda</Link>
        </div>
    )
}