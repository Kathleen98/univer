import { categories } from '@/lib/axios/mock-data';
import { ApiResponse, Categories } from '@/type/content';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
        const response: ApiResponse<Categories> = {
            success: true,
            data: categories
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error(`Houve erro na API content: ${error}`)
        const response: ApiResponse<Categories> = {
            success: false,
            error: 'Erro interno do servidor'
        };
        return NextResponse.json(response, { status: 500 });
    }
}