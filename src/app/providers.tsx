'use client'
import { QueryProvider } from "@/lib/tanstack"

interface ProvidersProps {
    children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    )
}