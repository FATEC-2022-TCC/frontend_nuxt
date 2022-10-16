import wrapper from "./wrapper"
import { baseFetch, Body } from "./baseFetch"

export const post = <Res>(url: string, body: Body) => wrapper<Res>(() => baseFetch(url, "POST", body))

export const get = <Res>(url: string) => wrapper<Res>(() => baseFetch(url, "POST"))