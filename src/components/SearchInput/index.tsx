'use client'
import { Search } from "lucide-react"
import { Input } from "../ui/input"
import { useState } from "react"
import style from './index.module.css'

export const SearchInput = () => {
    const [inputActive, setInputActive] = useState(false)
    return (
        <div className="relative inline-block">
            <Input
                onFocus={() => setInputActive(true)}
                onBlur={() => setInputActive(false)}
                className={`pr-10 text-white ${inputActive ? style.input : "w-10 rounded-3xl"
                    }`}
            />
            <Search className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none ${inputActive ? "opacity-50" : "opacity-100"
                }`} />
        </div>
    )
}