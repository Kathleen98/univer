import { Input } from "@/components/ui/input"
import Image from "next/image"
import banner from '../../../../public/banner-sign-in.webp'
import { Button } from "@/components/ui/button"
import style from './index.module.css'
import logoUniver from '../../../../public/logo-univer-branco.png'
import Link from "next/link"
import { univerAPI } from "@/lib/axios/univer-api"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"


const SignIn = () => {

    const handleSignIn = async (formData: FormData) => {
        "use server"
        const email = formData.get("email")
        const password = formData.get("password")

        if (!email) {
            throw new Error("Preencha o campo email!");
        }

        if (!password) {
            throw new Error("Preencha o campo senha!");
        }

        try {

            const response = await univerAPI.post('/sign-in', {
                email,
                password
            })

            console.log(response)

            const expressTime = 60 * 60 * 24 * 30 * 1000
            const cookie = await cookies()
            cookie.set('session', response.data.token, {
                maxAge: expressTime,
                path: '/',
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production'
            })

        } catch (e) {
            console.log(`Erro ao fazer login ${e}`)
        }

        redirect("/home")

    }


    return (
        <div className="grid grid-cols-2 w-full h-screen">
            <div className={`col-span-1 relative  ${style.img}`}>
                <Image src={banner} alt={"Banner série Paulo"} fill style={{ objectFit: "cover" }} />
            </div>
            <div className="col-span-1 bg-[#000210] flex items-center justify-center">
                <form action={handleSignIn} className="w-[390px] flex flex-col items-center justify-center">
                    <Image width={120} height={120} src={logoUniver} alt="Logo Univer branco" />
                    <div className="flex flex-col gap-5 w-[100%]">
                        <Input name="email" placeholder="E-mail" className="text-white" />
                        <Input name="password" type="password" placeholder="Senha" className="text-white" />
                        <Button className="cursor-pointer">Entrar</Button>
                    </div>
                    <div className="flex flex-col items-center mt-1">
                        <Link className="text-muted-foreground text-xs hover:underline font-bold" href={"#"}>Esqueci a senha</Link>
                        <Link className="text-muted-foreground text-xs hover:underline font-bold" href={"/Sign-out"}>Cadastrar</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn