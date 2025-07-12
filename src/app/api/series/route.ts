import { mockData } from '@/lib/axios/mock-data';
import { ApiResponse, PaginationInfo, Series } from '@/type/content';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        let series = mockData.series;

        // Filtrar por featured
        if (searchParams.get('featured') === 'true') {
            series = series.filter(s => s.featured);
        }

        // Filtrar por status
        const status = searchParams.get('status');
        if (status) {
            series = series.filter(s => s.status === status);
        }

        // Filtrar por gênero
        const genre = searchParams.get('genre');
        if (genre) {
            series = series.filter(s =>
                s.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))
            );
        }

        // Busca por texto
        const q = searchParams.get('q');
        if (q) {
            const searchTerm = q.toLowerCase();
            series = series.filter(s =>
                s.title.toLowerCase().includes(searchTerm) ||
                s.description.toLowerCase().includes(searchTerm) ||
                s.creator.toLowerCase().includes(searchTerm) ||
                s.cast.some(actor => actor.toLowerCase().includes(searchTerm))
            );
        }

        // Paginação
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedSeries = series.slice(startIndex, endIndex);

        const totalPages = Math.ceil(series.length / limit);

        const pagination: PaginationInfo = {
            currentPage: page,
            pageSize: limit,
            totalItems: series.length,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };

        const response: ApiResponse<Series[]> = {
            success: true,
            data: paginatedSeries,
            pagination,
            query: q || undefined,
            totalResults: series.length
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error(`Houve erro na API content: ${error}`)
        const response: ApiResponse<Series[]> = {
            success: false,
            error: 'Erro interno do servidor'
        };
        return NextResponse.json(response, { status: 500 });
    }
}