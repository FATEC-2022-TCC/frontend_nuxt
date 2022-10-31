import { Base64 } from '~~/composables/api/Base64'

export interface Compliant {
    id: number,
    local: string,
    description: string,
    created: string,
    files: Array<Base64>,
    resolution: string,
    resolutionFiles: Array<Base64>,
    closed: boolean,
    updated: string
}

export interface UpdateCompliantRequest {
    id: number,
    resolution: String,
    resolutionFiles: Array<String>,
    closed: Boolean
}

export interface CompliantProjection {
    id: number,
    local: string,
    description: string,
    created: string,
    closed: boolean
}