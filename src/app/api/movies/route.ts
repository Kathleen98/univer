import { mockData } from '@/lib/axios/mock-data';
import { ApiResponse, Movie, PaginationInfo } from '@/type/content';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        let movies = mockData.movies;

        // Filtrar por featured
        if (searchParams.get('featured') === 'true') {
            movies = movies.filter(movie => movie.featured);
        }

        // Filtrar por gênero
        const genre = searchParams.get('genre');
        if (genre) {
            movies = movies.filter(movie =>
                movie.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))
            );
        }

        // Busca por texto
        const q = searchParams.get('q');
        if (q) {
            const searchTerm = q.toLowerCase();
            movies = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.description.toLowerCase().includes(searchTerm) ||
                movie.director.toLowerCase().includes(searchTerm) ||
                movie.cast.some(actor => actor.toLowerCase().includes(searchTerm))
            );
        }

        // Paginação
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedMovies = movies.slice(startIndex, endIndex);

        const totalPages = Math.ceil(movies.length / limit);

        const pagination: PaginationInfo = {
            currentPage: page,
            pageSize: limit,
            totalItems: movies.length,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };

        const response: ApiResponse<Movie[]> = {
            success: true,
            data: paginatedMovies,
            pagination,
            query: q || undefined,
            totalResults: movies.length
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error(`Houve erro na API moveis: ${error}`)
        const response: ApiResponse<Movie[]> = {
            success: false,
            error: 'Erro interno do servidor'
        };
        return NextResponse.json(response, { status: 500 });
    }
}