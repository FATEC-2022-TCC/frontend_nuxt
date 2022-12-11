import { Base64 } from "../api/Base64"

export interface CategoryResponse {
    id: number,
    name: string,
    description: string,
    images: Array<Base64>
}

export interface CategoryProjection {
    id: number,
    name: string,
    description: string
}