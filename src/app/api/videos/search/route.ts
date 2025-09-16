import { getApiSSR } from "@/lib/axios/univer-api";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const api = await getApiSSR()

    const apiURL = category ? `/video/category/${category}` : '/video'

    const response = await api.get(apiURL)

    return NextResponse.json(response.data)

  } catch (error) {

    console.error(`[API SEARCH HANDLER], ${error}`)
    return new NextResponse(`Erro interno ao buscar vídeos`, { status: 500 })
  }
}