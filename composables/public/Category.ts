export interface AddCategoryRequest {
    name: string,
    description: string,
    images: Array<string>
}

export interface CategoryProjection {
    id: number,
    name: string,
    description: string
}

export interface UpdateCategoryRequest {
    id: number,
    name: string,
    description: string,
    images: Array<string>
}