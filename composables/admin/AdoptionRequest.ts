import Page from "../api/Page"
import { StateDescription, Status } from "../api/Status"

export interface AdoptionRequestProjection {
    id: number,
    createdBy: string
}

export interface SearchAdoptionRequestProjectionResponse {
    page: Page<AdoptionRequestProjection>,
    statuses: Array<StateDescription>
}

export interface AdoptionRequest {
    id: number,
    statuses: Array<Status>,
    currentStatusCode: number,
    createdBy: string
}

export interface AdoptionRequestResponse {
    data: AdoptionRequest,
    allowedStatus: Array<StateDescription>,
}

export interface UpdateAdoptionRequestStatusRequest {
    id: number,
    status: {
        code: number,
        description: string,
        files: Array<string>
    }
}