import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { CircleChevronDown } from "lucide-react"
import Image from "next/image"
import { IndicativeClassification } from "../IndicativeClassification"

export const ContentDetail = () => {
  return (
    <Dialog >
      <DialogTrigger className="cursor-pointer">
        <CircleChevronDown color="white" />
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="bg-[#173355] border-none min-w-[35vw] p-0  ">
        <DialogTitle className="text-transparent hidden">Informações sobre o conteúdo</DialogTitle>
        <DialogHeader>
          <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuw4ufk4NX65_dx0SemA1Agg23F7EZnVIiKg&s'} width={1100} height={700} alt="banner" />
        </DialogHeader>
        <div className="grid grid-cols-3 px-10 py-5">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="">
              <p className="text-muted-foreground text-sm">{new Date().getFullYear()} 2h 15min</p>
              <p><IndicativeClassification text={'L'} /></p>
            </div>
            <p className="text-white text-sm">Esta é uma descrição opcional do vídeo, Esta é uma descrição opcional do vídeo, Esta é uma descrição opcional do vídeo Esta é uma descrição opcional do vídeoEsta é uma descrição opcional do vídeo</p>
          </div>
          <div className="col-span-1">
            <p className=" text-muted-foreground text-sm">Elenco:</p>
            <p className=" text-muted-foreground text-sm">Gênero:</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}