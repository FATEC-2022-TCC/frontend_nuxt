import Page from "../api/Page"
import { StateDescription } from "../api/Status"

export interface AdoptionRequestProjection {
    id: number,
    createdBy: string
}

export interface SearchAdoptionRequestProjectionResponse {
    page: Page<AdoptionRequestProjection>,
    statuses: Array<StateDescription>
}