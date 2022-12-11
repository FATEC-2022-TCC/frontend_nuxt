import { Status, StateDescription } from '~~/composables/api/Status'
import { Base64 } from '../api/Base64'

import Page from '../api/Page'

export interface AdoptionResponse {
    data: Adoption,
    allowedStatus: Array<StateDescription>
}

export interface Adoption {
    id: number,
    name: string,
    description: string,
    picture: string
    images: Array<Base64>,
    statuses: Array<Status>,
    currentStatusCode: number
}

export interface UpdateAdoptionStatusRequest {
    id: number,
    status: {
        code: number,
        description: string,
        images: Array<string>
    }
}

export interface AdoptionProjection {
    id: number,
    name: string,
    description: string,
    picture: string
}

export interface SearchAdoptionProjectionResponse {
    page: Page<AdoptionProjection>,
    statuses: Array<StateDescription>
}

export interface NewAdoptionRequest {
    name: string,
    description: string,
    gender: string,
    size: string,
    categoryId: number,
    picture: string,
    images: Array<string>,
    age: string
}