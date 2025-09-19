export type videosProps = contents[]

export interface contents {
  id: string
  title: string
  slug: string
  description: string
  duration: number
  releaseDate: string
  createdAt: string
  updatedAt: string
  videoUrl: string
  thumbnailUrl: string
  trailerUrl: string
  ageRating: string
  type: string
  status: string
  isOriginal: boolean
}
