import LoginRequest from "./ts/LoginRequest";
import Result from "./ts/Result";
import { post, get } from "./wrapper";

export function login(body: LoginRequest): Promise<Result<string>> {
    return post<string>("/user/login", body)
}

export function adminTest(): Promise<Result<null>> {
    return get<null>("/admin/test")
}