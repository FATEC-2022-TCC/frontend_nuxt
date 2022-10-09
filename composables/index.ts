import { post } from './api'
import { Result } from "./api/wrapper";

import LoginRequest from "./api/LoginRequest";

export function login(body: LoginRequest): Promise<Result<string>> {
    return post("/user/login", body)
}