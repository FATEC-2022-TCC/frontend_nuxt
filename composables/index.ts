import { post } from './api'
import { Result, When } from "./api/wrapper";

import LoginRequest from "./api/LoginRequest";
import LoginResponse from "./api/LoginResponse"

import SignUpRequest from "./api/SignUpRequest";

export const handle = <T>(when: Partial<When<T>>) => (result: Result<T>) => result.handle(when)

export const login = (body: LoginRequest) => post<LoginResponse>("/user/login", body)

export const signup = (body: SignUpRequest) => post<null>("/user", body)

export const uploadFile = (body: FormData) => post<null>("/file", body)