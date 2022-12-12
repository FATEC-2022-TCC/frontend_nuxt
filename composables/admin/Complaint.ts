import { Base64 } from '~~/composables/api/Base64'
import { Status, StateDescription } from '~~/composables/api/Status'

import Page from '../api/Page'

export interface ComplaintResponse {
    data: Complaint,
    allowedStatus: Array<StateDescription>,
}

export interface Complaint {
    id: number,
    local: string,
    description: string,
    images: Array<Base64>,
    statuses: Array<Status>,
    currentStatusCode: number
}

export interface UpdateComplaintRequest {
    id: number,
    status: {
        code: number,
        description: string,
        images: Array<string>
    }
}

export interface ComplaintProjection {
    id: number,
    local: string,
    description: string,
    created: string,
    closed: boolean,
    currentStatusCode: number
}

export interface SearchComplaintProjectionResponse {
    page: Page<ComplaintProjection>,
    statuses: Array<StateDescription>
}