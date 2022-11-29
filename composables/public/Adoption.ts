import { Base64 } from "../api/Base64"

export interface Category {
    id: number,
    name: string
}

export interface AdoptionProjection {
    id: number,
    name: string,
    description: string,
    picture: string
}

export interface Adoption {
    id: number,
    name: string,
    description: string,
    gender: string,
    size: string,
    category: Category,
    picture: string,
    images: Array<Base64>,
    created: string
}