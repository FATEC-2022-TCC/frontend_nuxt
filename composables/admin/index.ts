import { post } from "../api"

import { ContentRequest, ContentResponse } from "./Content"

export const uploadFile = (body: FormData) => post<null>("/file", body)

export const addContent = (body: ContentRequest) => post<ContentResponse>("/admin/content", body)