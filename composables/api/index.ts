import wrapper, { Result } from "./wrapper"
import { baseFetch, Body } from "./baseFetch"

export function post<Res>(url: string, body: Body): Promise<Result<Res>> {
    return wrapper(() => baseFetch(url, "POST", body))
}

export function get<Res>(url: string): Promise<Result<Res>> {
    return wrapper(() => baseFetch(url, "POST"))
}