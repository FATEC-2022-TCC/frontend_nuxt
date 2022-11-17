import { get, post } from "../api"

import {
    SignInRequest,
    SignInResponse
} from "./SignIn";

import {
    SignUpRequest
} from "./SignUp";

import {
    ContentProjection,
    ContentResponse
} from "../admin/Content"

import {
    NewComplaintRequest
} from "./Complaint"

import {
    ChatbotRequest,
    ChatbotResponse
} from "./Chatbot"

import {
    CategoryProjection
} from "./Category"

import {
    Adoption,
    AdoptionProjection
} from "./Adoption"

import Page from "../api/Page";

export const signin = (body: SignInRequest) => post<SignInResponse>("/public/sign/in", body)

export const signup = (body: SignUpRequest) => post<null>("/public/sign/up", body)

//---

export const getContentProjectionInEvidence = () => get<Array<ContentProjection>>("/public/content/projection/evidence")

export const searchPublicContentProjection = (text: string, page: number) => get<Page<ContentProjection>>(
    "/public/content/projection",
    {
        query: {
            text,
            page
        }
    }
)

export const getPublicContent = (id: string) => get<ContentResponse>(argsToURL("/public/content/{id}", { id }))

export const addComplaint = (body: NewComplaintRequest) => post<null>("/public/complaint", body)

// --

export const sendChatbotMessage = (body: ChatbotRequest) => post<ChatbotResponse>("/public/chatbot", body)

// --

export const getAllCategoryProjection = () => get<Array<CategoryProjection>>("/public/category/project/all")

// --

export const searchPublicAdoption = (text: string, gender: string, size: string, page: number) => get<Page<AdoptionProjection>>(
    "/public/adoption/projection",
    {
        query: {
            text,
            gender,
            size,
            page
        }
    }
)

export const getPublicAdoption = (id: string) => get<Adoption>(argsToURL("/public/adoption/{id}", { id }))