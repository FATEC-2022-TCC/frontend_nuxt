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

export const signin = (body: SignInRequest) => post<SignInResponse>("/public/sign/in", body)

export const signup = (body: SignUpRequest) => post<null>("/public/sign/up", body)

export const getContentProjectionInEvidence = () => get<Array<ContentProjection>>("/public/content/projection/evidence")

export const getPublicContent = (id: string) => get<ContentResponse>(argsToURL("/public/content/{id}", { id }))

export const addComplaint = (body: NewComplaintRequest) => post<null>("/public/complaint", body)

export const sendChatbotMessage = (body: ChatbotRequest) => post<ChatbotResponse>("/public/chatbot", body)