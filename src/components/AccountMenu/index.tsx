import { ChevronDown } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu"

export const AccountMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="p-1 rounded-md">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                    </Avatar>
                    <ChevronDown className="size-4 text-muted-foreground cursor-pointer" />
                </div>
            </DropdownMenuTrigger>
        </DropdownMenu>
    )
}