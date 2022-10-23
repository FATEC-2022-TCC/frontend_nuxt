import wrapper, { Result } from "./wrapper"
import { baseFetch, Body } from "./baseFetch"

export const get = <Res>(url: string) => wrapper<Res>(() => baseFetch(url, "GET"))

export const post = <Res>(url: string, body: Body) => wrapper<Res>(() => baseFetch(url, "POST", body))

export const put = <Res>(url: string, body: Body) => wrapper<Res>(() => baseFetch(url, "PUT", body))

export const del = <Res>(url: string, args: { [key: string]: string}): Promise<Result<Res>> => {
    let replaced = url
    for (const key in args) replaced = replaced.replace(`{${key}}`, args[key])
    return wrapper<Res>(() => baseFetch(replaced, "DELETE"))
}