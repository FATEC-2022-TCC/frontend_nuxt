import LoginRequest from "./ts/LoginRequest";
import Result from "./ts/Result";
import { post } from "./wrapper";

export default function login(body: LoginRequest): Promise<Result<string>> {
    return post<string>("/user/login", body)
}