import { Status, StateDescription } from '~~/composables/api/Status'

import Page from '../api/Page'

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
    picture: string,
    images: Array<string>
}