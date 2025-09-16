import { univerAPI } from "@/lib/axios/univer-api"

export const searchCategoryAPI = async (category: string) => {
  try {

    const response = await univerAPI.get(`video/category/${category}`)

    const data = response.data

    return data

  } catch (error) {

    alert(`Não foi possível fazer o filtro dos vídeos, ${error}`)
  }
}