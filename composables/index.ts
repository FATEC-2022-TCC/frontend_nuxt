import { post } from './api'
import { Result, When } from "./api/wrapper";
import { Body } from "./api/baseFetch"

import LoginRequest from "./api/LoginRequest";
import SignUpRequest from "./api/SignUpRequest";

export function handle<T>(when: Partial<When<T>>): (result: Result<T>) => void {
    return result => result.handle(when)
}

export function login(body: LoginRequest): Promise<Result<string>> {
    return post("/user/login", body)
}

export function signup(body: SignUpRequest): Promise<Result<null>> {
    return post("/user", body)
}

export function uploadFile(body: Body): Promise<Result<null>> {
    return post("/file", body)
}