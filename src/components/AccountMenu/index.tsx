import { ChevronDown, ChevronUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { ListMenu } from "./list-menu"
import { useState } from "react"

export const AccountMenu = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false)
    return (
        <Button onClick={() => setDropdownMenu(!dropdownMenu)} onBlur={() => setDropdownMenu(false)} className="rounded-md bg-transparent relative">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {dropdownMenu ?
                < ChevronUp />
                :
                < ChevronDown />}

            <ListMenu dropdownMenu={dropdownMenu} />
        </Button>
    )
}