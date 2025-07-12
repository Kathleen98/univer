import { mockData } from '@/lib/axios/mock-data';
import { ApiResponse, PaginationInfo, SpecialProgram } from '@/type/content';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        let programs = mockData.specialPrograms;

        // Filtrar por featured
        if (searchParams.get('featured') === 'true') {
            programs = programs.filter(p => p.featured);
        }

        // Filtrar por tipo
        const type = searchParams.get('type');
        if (type) {
            programs = programs.filter(p =>
                p.type.toLowerCase().includes(type.toLowerCase())
            );
        }

        // Filtrar por gênero
        const genre = searchParams.get('genre');
        if (genre) {
            programs = programs.filter(p =>
                p.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))
            );
        }

        // Busca por texto
        const q = searchParams.get('q');
        if (q) {
            const searchTerm = q.toLowerCase();
            programs = programs.filter(p =>
                p.title.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.type.toLowerCase().includes(searchTerm)
            );
        }

        // Paginação
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedPrograms = programs.slice(startIndex, endIndex);

        const totalPages = Math.ceil(programs.length / limit);

        const pagination: PaginationInfo = {
            currentPage: page,
            pageSize: limit,
            totalItems: programs.length,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };

        const response: ApiResponse<SpecialProgram[]> = {
            success: true,
            data: paginatedPrograms,
            pagination,
            query: q || undefined,
            totalResults: programs.length
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error(`Houve erro na API content: ${error}`)
        const response: ApiResponse<SpecialProgram[]> = {
            success: false,
            error: 'Erro interno do servidor'
        };
        return NextResponse.json(response, { status: 500 });
    }
}
