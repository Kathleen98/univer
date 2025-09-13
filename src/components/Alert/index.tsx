'use client'

import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

interface AlertGeneralProps {
  title: string;
  text: string;
  show: boolean;
}

export const AlertGeneral = ({ title, text, show }: AlertGeneralProps) => {
  const router = useRouter()

  const handleClose = () =>{
    const url = new URL(window.location.href)
    url.searchParams.delete('error')
    router.replace(url.pathname)
  }

  return (
    <AlertDialog open={show} onOpenChange={handleClose}> 
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {text}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose} className="mx-auto cursor-pointer">Fechar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}