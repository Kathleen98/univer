export type videosProps = Root2[]

export interface Root2 {
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
