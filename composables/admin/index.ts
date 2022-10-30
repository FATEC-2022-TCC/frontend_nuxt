import { get, post, put, del } from "../api"
import Page from "../api/Page"

import {
    NewContentRequest,
    UpdateContentRequest,
    ContentResponse,
    ContentProjection
} from "./Content"

import {
    CompliantProjection
} from "./Compliant"

export const addContent = (body: NewContentRequest) => post<ContentResponse>("/admin/content", body)

export const getContent = (id: string) => get<ContentResponse>(argsToURL("/admin/content/{id}", { id }))

export const updateContent = (body: UpdateContentRequest) => put<ContentResponse>("/admin/content", body)

export const deleteContent = (id: string) => del<null>(argsToURL("/admin/content/{id}", { id }))

export const getContentProjection = (text: string, page: number) => get<Page<ContentProjection>>(
    "/admin/content/projection",
    {
        query: {
            text,
            page
        }
    }
)

export const getCompliantProjection = (text: string, closed: boolean, page: number) => get<Page<CompliantProjection>>(
    "/admin/compliant/projection",
    {
        query: {
            text,
            closed,
            page
        }
    }
)