import { videosProps } from "@/type/videos"

export const searchCategoryClientAPI = async (category: string) => {
  try {
    const response = await fetch(`/api/videos/search?category=${category}`)

    if (!response.ok) {
      throw new Error('Falha ao buscar dados')
    }

    const data = await response.json()

    return data as videosProps

  } catch (error) {

    console.error(`Não foi possível fazer o filtro dos vídeos, ${error}`)

    return []
  }
}