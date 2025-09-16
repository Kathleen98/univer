import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const ReadyMadeFilters = () => {
  return (
    <div className="rounded-[180px]">
      <Avatar className="w-[80px] h-[80px] cursor-pointer">
        <AvatarImage src="https://www.univervideo.com/guia-de-marca/assets/10.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}