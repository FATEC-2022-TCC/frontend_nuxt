import wrapper, { Result } from "./wrapper"
import { baseFetch, Body } from "./baseFetch"

export const get = <Res>(url: string) => wrapper<Res>(() => baseFetch(url, "GET"))

export const post = <Res>(url: string, body: Body) => wrapper<Res>(() => baseFetch(url, "POST", body))

export const put = <Res>(url: string, body: Body) => wrapper<Res>(() => baseFetch(url, "PUT", body))

export const del = <Res>(url: string, args: { [Key in string]: string}): Promise<Result<Res>> => {
    let replaced = url
    for (const key in args) {
        const value = args[key]
        replaced = replaced.replace(`{${key}}`, value)
    }
    return wrapper<Res>(() => baseFetch(replaced, "DELETE"))
}