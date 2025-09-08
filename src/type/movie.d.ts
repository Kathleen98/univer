type AgeRating = 'G' | 'PG' | 'PG13' | 'R' | 'NC17' | 'NR';
type ContentType = 'MOVIE' | 'TV_SHOW' | 'DOCUMENTARY' | 'SHORT';
type ContentStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'ARCHIVED';

export interface Movie {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: number; // em segundos
  releaseDate: string; // ISO string
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  videoUrl: string;
  thumbnailUrl: string;
  introStartTime: number; // em segundos
  introEndTime: number; // em segundos
  trailerUrl: string | null;
  ageRating: AgeRating;
  type: ContentType;
  status: ContentStatus;
  isOriginal: boolean;
}