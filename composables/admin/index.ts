import { post, get } from "../api"

import {
    ContentRequest,
    ContentResponse,
    ContentProjection
} from "./Content"

export const uploadFile = (body: FormData) => post<null>("/file", body)

export const addContent = (body: ContentRequest) => post<ContentResponse>("/admin/content", body)

export const getContentProjection = () => get<Array<ContentProjection>>("/admin/content/projection")