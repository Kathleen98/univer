import { getContentAPI } from "@/lib/axios/get-content"
import { queryOptions } from "@tanstack/react-query"

export const getContentFn = () => {
    return queryOptions({
        queryKey: ['get-content'],
        queryFn: () => getContentAPI()
    })
}