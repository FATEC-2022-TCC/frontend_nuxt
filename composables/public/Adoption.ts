import { Base64 } from "../api/Base64"

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
    picture: string,
    images: Array<Base64>,
    created: string
}