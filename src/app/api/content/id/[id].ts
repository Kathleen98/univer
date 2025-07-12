import { mockData } from '@/lib/axios/mock-data';
import { ApiResponse, Content } from '@/type/content';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const allContent: Content[] = [
            ...mockData.movies,
            ...mockData.series,
            ...mockData.specialPrograms
        ];

        const content = allContent.find(item => item.id === id);

        if (!content) {
            const response: ApiResponse<Content> = {
                success: false,
                error: 'Conteúdo não encontrado'
            };
            return NextResponse.json(response, { status: 404 });
        }

        const response: ApiResponse<Content> = {
            success: true,
            data: content
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error(`Houve erro na API content: ${error}`)
        const response: ApiResponse<Content> = {
            success: false,
            error: 'Erro interno do servidor'
        };
        return NextResponse.json(response, { status: 500 });
    }
}