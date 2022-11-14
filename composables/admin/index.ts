import { get, post, put, del } from "../api"
import Page from "../api/Page"

import {
    NewContentRequest,
    UpdateContentRequest,
    ContentResponse,
    ContentProjection
} from "./Content"

import {
    Complaint,
    ComplaintProjection,
    ComplaintResponse,
    SearchComplaintProjectionResponse,
    UpdateComplaintRequest
} from "./Complaint"

import {
    AddCategoryRequest,
    CategoryProjection,
    UpdateCategoryRequest
} from "../public/Category"

import {
    CategoryResponse
} from "./Category"

import {
    AdoptionProjection,
    NewAdoptionRequest,
    SearchAdoptionProjectionResponse
} from "./Adoption"

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

// --

export const getComplaint = (id: string) => get<ComplaintResponse>(argsToURL("/admin/complaint/{id}", { id }))

export const searchComplaintProjection = (currentStatusCode: number, text: string, page: number) =>
    get<SearchComplaintProjectionResponse>(
        "/admin/complaint/projection",
        {
            query: {
                currentStatusCode,
                text,
                page
            }
        }
    )

export const addComplaintStatus = (body: UpdateComplaintRequest) => post<Complaint>("/admin/complaint/status", body)

// --

export const addCategory = (body: AddCategoryRequest) => post<never>("/admin/category", body)

export const getCategory = (id: string) => get<CategoryResponse>(argsToURL("/admin/category/{id}", { id }))

export const searchCategoryProjection = (text: string, page: number) => get<Page<CategoryProjection>>(
    "/admin/category/projection",
    {
        query: {
            text,
            page
        }
    }
)

export const updateCategory = (body: UpdateCategoryRequest) => put<never>("/admin/category", body)

// --

export const addAdoption = (body: NewAdoptionRequest) => post<never>("/admin/adoption", body)

export const searchAdoptionProjection = (currentStatusCode: number, text: string, page: number) => get<SearchAdoptionProjectionResponse>(
    "/admin/adoption/projection",
    {
        query: {
            currentStatusCode,
            text,
            page
        }
    }
)