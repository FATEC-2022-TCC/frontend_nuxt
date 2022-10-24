import { get, post, put, del } from "../api"

import {
    NewContentRequest,
    UpdateContentRequest,
    ContentResponse,
    ContentProjection
} from "./Content"

export const addContent = (body: NewContentRequest) => post<ContentResponse>("/admin/content", body)

export const getContent = (id: string) => get<ContentResponse>(argsToURL("/admin/content/{id}", { id }))

export const updateContent = (body: UpdateContentRequest) => put<ContentResponse>("/admin/content", body)

export const deleteContent = (id: string) => del<null>(argsToURL("/admin/content/{id}", { id }))

export const getContentProjection = () => get<Array<ContentProjection>>("/admin/content/projection")