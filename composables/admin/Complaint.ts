import { Base64 } from '~~/composables/api/Base64'

export interface Status {
    id: number,
    code: number,
    description: string,
    files: Array<Base64>,
    createdBy: string,
    created: string
}

export interface ComplaintResponse {
    complaint: Complaint,
    allowedStatus: Array<{ code: number, description: string }>,
}

export interface Complaint {
    id: number,
    local: string,
    description: string,
    files: Array<Base64>,
    statuses: Array<Status>,
    currentStatusCode: number
}

export interface UpdateComplaintRequest {
    id: number,
    status: {
        code: number,
        description: string,
        files: Array<string>
    }
}

export interface ComplaintProjection {
    id: number,
    local: string,
    description: string,
    created: string,
    closed: boolean
}