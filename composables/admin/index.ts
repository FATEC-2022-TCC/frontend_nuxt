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
    AdoptionResponse,
    NewAdoptionRequest,
    SearchAdoptionProjectionResponse,
    UpdateAdoptionStatusRequest
} from "./Adoption"

import {
    SearchAdoptionRequestProjectionResponse,
    AdoptionRequestResponse,
    UpdateAdoptionRequestStatusRequest
} from "./AdoptionRequest"

import {
    UpdateUserPasswordRequest,
    UpdateUserRequest,
    User,
    UserProjection
} from "./User"

import { 
    NewRealityRequest, 
    RealityProjection
} from "./Reality"

export const addContent = (body: NewContentRequest) => post<ContentResponse>("/admin/content", body)

export const getContent = (id: string) => get<ContentResponse>(argsToURL("/admin/content/{id}", { id }))

export const updateContent = (body: UpdateContentRequest) => put<ContentResponse>("/admin/content", body)

export const deleteContent = (id: string) => del<null>(argsToURL("/admin/content/{id}", { id }))

export const searchContentProjection = (text: string, page: number) => get<Page<ContentProjection>>(
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

export const addAdoptionStatus = (body: UpdateAdoptionStatusRequest) => post<never>("/admin/adoption/status", body)

export const getAdoption = (id: string) => get<AdoptionResponse>(argsToURL("/admin/adoption/{id}", { id }))

export const searchAdoptionProjection = (currentStatusCode: number, text: string, gender: string, size: string, page: number) => get<SearchAdoptionProjectionResponse>(
    "/admin/adoption/projection",
    {
        query: {
            currentStatusCode,
            text,
            gender,
            size,
            page
        }
    }
)

// --

export const addAdoptionRequestStatus = (body: UpdateAdoptionRequestStatusRequest) => post<never>("/admin/adoption/request/status", body)

export const getAdoptionRequest = (id: string) => get<AdoptionRequestResponse>(argsToURL("/admin/adoption/request/{id}", { id }))

export const searchAdoptionRequestProjection = (id: string, text: string, currentStatusCode: number, page: number) => get<SearchAdoptionRequestProjectionResponse>(
    "/admin/adoption/request/projection",
    {
        query: {
            id,
            text,
            currentStatusCode,
            page
        }
    }
)

// --

export const searchUserProjection = (text: string, isActive: boolean, isValidated: boolean, page: number) => get<Page<UserProjection>>(
    "/admin/user/projection",
    {
        query: {
            text,
            isActive,
            isValidated,
            page
        }
    }
)

export const getUser = (id: string) => get<User>(argsToURL("/admin/user/{id}", { id }))

export const updateUser = (body: UpdateUserRequest) => put<never>("/admin/user", body)

export const updateUserPassword = (body: UpdateUserPasswordRequest) => put<never>("/admin/user/password", body)

// --

export const addReality = (body: NewRealityRequest) => post<never>("/admin/reality", body)

export const searchRealityProjection = (text: string, isVisible: boolean, page: number) => get<Page<RealityProjection>>(
    "/admin/reality/projection",
    {
        query: {
            text,
            isVisible,
            page
        }
    }
)