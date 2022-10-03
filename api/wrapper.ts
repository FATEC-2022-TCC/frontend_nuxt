import { FetchError, FetchResponse } from "ohmyfetch"
import Error from "./ts/Error"
import Response from "./ts/Response"
import Result from "./ts/Result"

type Method = "GET" | "POST" | "PUT" | "DELETE"

async function fetch<Request, Response>(url: string, method: Method, body?: Request): Promise<FetchResponse<Response>> {
    const headers: HeadersInit = {}
    const token = useCookie('token')
    if (token.value) {
        headers["Authorization"] = `Bearer ${token}`
    }
    const appConfig = useAppConfig()
    const api: string = appConfig['api']
    const fullUrl = `${api}${url}`
    return $fetch.raw<Response>(
        fullUrl,
        {
            body,
            method,
            headers,
            onResponseError: async context => {
                const status = context.response.status
                if (status === 401 || status === 403) {
                    console.log("---")
                    console.log("Invalid token provided")
                    console.log("Redirecting")
                    token.value = ""
                    const router = useRouter()
                    router.replace('/error')
                }
            }
        }
    )
}

async function safe<T>(callback: () => Promise<FetchResponse<Response<T>>>): Promise<Result<T | null>> {
    try {
        const fetchResponse = await callback()
        const data = fetchResponse._data
        if (!data) return Result.success(null);
        const { data: { value } } = data
        return Result.success(value)
    } catch (e) {
        const fetchError: FetchError = e
        if (!fetchError) return Result.error({
            message: "Internal frontend error",
            code: -1
        })
        const data: Error = fetchError.data
        if (!data) return Result.error({
            message: "Internal frontend error",
            code: -1
        })
        return Result.error(data)
    }
}

export async function get<T>(url: string): Promise<Result<T | null>> {
    return safe(() => fetch(url, "GET"))
}

export async function post<T>(url: string, body?: any): Promise<Result<T | null>> {
    return safe(() => fetch(url, "POST", body))
}

export async function put<T>(url: string, body?: any): Promise<Result<T | null>> {
    return safe(() => fetch(url, "PUT", body))
}