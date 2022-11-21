import { Base64 } from "../api/Base64"
import { Status } from "../api/Status"

export interface AdoptionProjection {
    id: number,
    name: string,
    description: string,
    picture: string
}

export interface AdoptionRequest {
    id: number,
    statuses: Array<Status>,
    currentStatusCode: number,
    createdBy: string
}

export interface Adoption {
    id: number,
    name: string,
    description: string,
    picture: string
    images: Array<Base64>,
    statuses: Array<Status>,
    currentStatusCode: number,
    requests: Array<AdoptionRequest>
}