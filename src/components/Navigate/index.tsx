'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"


interface NavigateButtonProps {
  params: string;
  title: string;
}

export const NavigateButton = ({ params, title }: NavigateButtonProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

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
    <Button onClick={() => handleChangeParams(`${params}`)} className="text-muted text-sm  bg-transparent cursor-pointer hover:underline underline-offset-4 hover:bg-transparent">{title}</Button>
  )
}