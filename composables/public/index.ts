import { get } from "../api"

import {
    ContentProjection
} from "../admin/Content"

export const getContentProjectionInEvidence = () => get<Array<ContentProjection>>(
    "/public/content/evidence"
)