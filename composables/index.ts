import { post } from './api'
import { Result } from "./api/wrapper";

import LoginRequest from "./api/LoginRequest";
import SignUpRequest from "./api/SignUpRequest";

export function login(body: LoginRequest): Promise<Result<string>> {
    return post("/user/login", body)
}

export function signup(body: SignUpRequest): Promise<Result<null>> {
    return post("/user", body)
}