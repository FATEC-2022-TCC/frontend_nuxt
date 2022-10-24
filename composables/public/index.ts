import { get } from "../api"

import {
    ContentProjection
} from "../admin/Content"

export const getContentProjectionInEvidence = () => get<Array<ContentProjection>>(
    "/public/content/projection/evidence"
)

export const getContent = (id: string) => get<ContentProjection>(argsToURL(
    "/public/content/{id}",
    { id }
))