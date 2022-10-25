import { get } from "../api"

import {
    ContentProjection, 
    ContentResponse
} from "../admin/Content"

export const getContentProjectionInEvidence = () => get<Array<ContentProjection>>(
    "/public/content/projection/evidence"
)

export const getPublicContent = (id: string) => get<ContentResponse>(argsToURL(
    "/public/content/{id}",
    { id }
))