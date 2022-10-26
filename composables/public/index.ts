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
    NewCompliantRequest
} from "./Compliant"

export const signin = (body: SignInRequest) => post<SignInResponse>("/public/signin", body)

export const signup = (body: SignUpRequest) => post<null>("/public/signup", body)

export const getContentProjectionInEvidence = () => get<Array<ContentProjection>>("/public/content/projection/evidence")

export const getPublicContent = (id: string) => get<ContentResponse>(argsToURL("/public/content/{id}", { id }))

export const addCompliant = (body: NewCompliantRequest) => post<null>("/public/compliant", body)