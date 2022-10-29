import wrapper from "./wrapper"
import { baseFetch, Body } from "./baseFetch"

export const get = <Res>(
    url: string,
    optional?: {
        body?: Body,
        query?: {
            [key: string]: any
        }
    }) => wrapper<Res>(() => baseFetch(url, "GET", optional))

export const post = <Res>(url: string, body: Body) => wrapper<Res>(() => baseFetch(url, "POST", { body }))

export const put = <Res>(url: string, body: Body) => wrapper<Res>(() => baseFetch(url, "PUT", { body }))

export const del = <Res>(url: string) => wrapper<Res>(() => baseFetch(url, "DELETE"))