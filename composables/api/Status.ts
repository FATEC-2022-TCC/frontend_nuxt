import { Base64 } from '~~/composables/api/Base64'

export interface StatusRequest {
    code: number,
    description: string,
    files: Array<string>,
}

export interface Status {
    id: number,
    code: number,
    description: string,
    files: Array<Base64>,
    createdBy: string,
    created: string
}

export interface StateDescription {
    code: number,
    description: string
}