
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
import { AlertGeneral } from "@/components/Alert"

export const metadata={
  title: 'sign-in',
  description: 'Boas vindas a nossa página de login',
  
}

interface SignInProps {
  searchParams: Promise<{ error?: string }>
}

const SignIn = async ({ searchParams }: SignInProps) => {
  const resolvedSearchParams = await searchParams
  const showAlert = !!resolvedSearchParams.error

  const handleSignIn = async (formData: FormData) => {
    "use server"
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email) {
      console.log('❌ Email missing, redirecting...')
      redirect('/sign-in?error=missing_email')
    }

    if (!password) {
      redirect('/sign-in?error=missing_password')
    }

    try {

      const response = await univerAPI.post('/sign-in', {
        email,
        password
      })

      const expressTime = 60 * 60 * 24 * 30 * 1000
      const cookie = await cookies()
      cookie.set('session', response.data.toke, {
        maxAge: expressTime,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      })

      redirect("/home")


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status

        if (status === 400 || status === 401) {
          redirect('/sign-in?error=invalid_credentials')
        } else if (status === 500) {
          redirect('/sign-in?error=server_error')
        } else {
          redirect('/sign-in?error=http_error')
        }
      } else if (error.request) {
        redirect('/sign-in?error=network_error')
      } else {
        redirect('/sign-in?error=unknown_error')
      }
    }

}

const getErrorMesssage = () => {
  switch (resolvedSearchParams.error) {
    case 'missing_email': return 'Preencha o campo email!'
    case 'missing_password': return 'Preencha o campo senha!'
    case 'invalid_credentials': return 'Email ou senha incorretos'
    case 'unauthorized': return 'Acesso não autorizado'
    case 'server_error': return 'Erro interno do servidor'
    case 'network_error': return 'Erro de conexão com o servidor'
    case 'http_error': return 'Erro na comunicação com o servidor'
    case 'unknown_error': return 'Erro desconhecido'
    default: return 'Erro desconhecido'
  }
}


return (
  <div className="grid grid-cols-2 w-full h-screen">
    {showAlert && (<AlertGeneral title="Erro ao fazer login" text={getErrorMesssage()} show={true} />)}
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