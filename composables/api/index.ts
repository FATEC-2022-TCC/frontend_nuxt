import wrapper, { Result } from "./wrapper"
import { baseFetch } from "./baseFetch"

export function post<Res, Req>(url: string, body: Req): Promise<Result<Res>>{
    return wrapper(() => baseFetch<Res>(url, "POST", body))
}