import { mockAPI } from "./mocki-API"

export const getContentAPI = async () => {
    try {
        const response = await mockAPI.get(`/content`)
        const data = response.data
        console.log(data)
        return data
    } catch (e) {
        console.error(`Erro ao carregar os conteúdos: ${e}`)
        throw e
    }
}