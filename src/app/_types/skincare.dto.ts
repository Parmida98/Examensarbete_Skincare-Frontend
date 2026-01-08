export type SkinTypeDTO = {
  label: string
  types: string
  description: string
}

export type IngredientDTO = {
  inciName: string
  description: string | null
}

export type PageResponseDTO<T> = {
  items: T[]
  page: number
  size: number
  totalItems: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}
