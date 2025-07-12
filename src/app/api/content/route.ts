import { mockData } from '@/lib/axios/mock-data';
import { ApiResponse, Content, PaginationInfo, SearchParams } from '@/type/content';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);


        const params: SearchParams = {
            category: searchParams.get('category') || undefined,
            featured: searchParams.get('featured') || undefined,
            genre: searchParams.get('genre') || undefined,
            limit: searchParams.get('limit') || undefined,
            page: searchParams.get('page') || undefined,
            q: searchParams.get('q') || undefined,
        };

        let allContent: Content[] = [
            ...mockData.movies,
            ...mockData.series,
            ...mockData.specialPrograms
        ];


        if (params.category) {
            allContent = allContent.filter(content => content.category === params.category);
        }


        if (params.featured === 'true') {
            allContent = allContent.filter(content => content.featured);
        }


        if (params.genre) {
            allContent = allContent.filter(content =>
                content.genre.some(g => g.toLowerCase().includes(params.genre!.toLowerCase()))
            );
        }


        if (params.q) {
            const searchTerm = params.q.toLowerCase();
            allContent = allContent.filter(content =>
                content.title.toLowerCase().includes(searchTerm) ||
                content.description.toLowerCase().includes(searchTerm) ||
                content.synopsis.toLowerCase().includes(searchTerm) ||
                content.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        const page = parseInt(params.page || '1');
        const limit = parseInt(params.limit || '10');
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedContent = allContent.slice(startIndex, endIndex);

        const totalPages = Math.ceil(allContent.length / limit);

        const pagination: PaginationInfo = {
            currentPage: page,
            pageSize: limit,
            totalItems: allContent.length,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };

        const response: ApiResponse<Content[]> = {
            success: true,
            data: paginatedContent,
            pagination,
            query: params.q,
            totalResults: allContent.length
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error(`Houve erro na API content: ${error}`)
        const response: ApiResponse<Content[]> = {
            success: false,
            error: 'Erro interno do servidor'
        };
        return NextResponse.json(response, { status: 500 });
    }
}