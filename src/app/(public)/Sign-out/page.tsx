import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import banner from '../../../../public/banner-sign-in.webp'
import logoUniver from '../../../../public/logo-univer-branco.png'
import style from '../Sign-in/index.module.css'
import Image from "next/image"
import Link from "next/link"
import { univerAPI } from "@/lib/axios/mocki-API"
import { redirect } from "next/navigation"

const SignOut = () => {

    const handleRegister = async (formData: FormData) => {
        "use server"
        try {
            const name = formData.get("name")
            const email = formData.get("email");
            const password = formData.get("password")
            const confirmPassword = formData.get("confirmPassword")

            if (password !== confirmPassword) {
                throw new Error("Senha errada");
            }

            const response = await univerAPI.post(`/register-user`, {
                name,
                email,
                password
            })

            if(response.status === 200){
                redirect('/Sign-in')
            }

            const data = response.data

            return data

        } catch (e) {
            console.error(`Erro ao na tentativa de cadastro: ${e}`)
        }
    }

    return (
        <div className="grid grid-cols-2 w-full h-screen">
            <div className={`col-span-1 relative  ${style.img}`}>
                <Image src={banner} alt={"Banner série Paulo"} fill style={{ objectFit: "cover" }} />
            </div>
            <div className="col-span-1 bg-[#000210] flex items-center justify-center">
                <form action={handleRegister} className="w-[390px] flex flex-col items-center justify-center">
                    <Image width={120} height={120} src={logoUniver} alt="Logo Univer branco" />
                    <p className="text-muted-foreground text-2xl xl:mb-12">Registre-se</p>
                    <div className="flex flex-col gap-5 w-[100%]">
                        <Input className="text-white" name="name" placeholder="Nome" />
                        <Input className="text-white" name="email" placeholder="E-mail" />
                        <Input className="text-white" name="password" type="password" placeholder="Senha" />
                        <Input className="text-white" name="confirmPassword" type="password" placeholder="Confirmar senha" />
                        <Button className="cursor-pointer">Cadastrar</Button>
                    </div>
                    <div className="flex flex-col items-center mt-1">
                        <Link className="text-muted-foreground text-xs hover:underline font-bold" href={"#"}>Fazer login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignOut