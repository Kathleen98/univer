export interface Reviews {
    average: number;
    total: number;
}

export interface BaseContent {
    id: number;
    title: string;
    slug: string;
    image: string;
    bannerImage: string;
    description: string;
    synopsis: string;
    ageRating: string;
    duration: string;
    durationMinutes: number;
    genre: string[];
    year?: number;
    category: 'movie' | 'series' | 'program';
    featured: boolean;
    reviews: Reviews;
    tags: string[];
    releaseDate?: string;
    trailer?: string;
    available: boolean;
    videoUrl: string; // Nova propriedade para o player
}

export interface Movie extends BaseContent {
    category: 'movie';
    director: string;
    cast: string[];
}

export interface Series extends BaseContent {
    category: 'series';
    seasons: number;
    episodes: number;
    status: 'Ongoing' | 'Finished' | 'Cancelled';
    creator: string;
    cast: string[];
    nextEpisode?: string;
}

export interface SpecialProgram extends BaseContent {
    category: 'program';
    type: string;
    schedule?: string;
    nextBroadcast?: string;
}

export type Content = Movie | Series | SpecialProgram;

export interface MockData {
    movies: Movie[];
    series: Series[];
    specialPrograms: SpecialProgram[];
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    pagination?: PaginationInfo;
    query?: string;
    totalResults?: number;
}

export interface PaginationInfo {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface Categories {
    main: string[];
    genres: string[];
    ageRatings: string[];
}

export interface SearchParams {
    category?: string;
    featured?: string;
    genre?: string;
    limit?: string;
    page?: string;
    q?: string;
}