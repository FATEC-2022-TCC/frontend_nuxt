export interface AddCategoryRequest {
    name: string,
    description: string
}

export interface CategoryProjection {
    id: number,
    name: string,
    description: string
}