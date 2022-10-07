import { FetchError } from "ohmyfetch"
import { NitroFetchRequest } from "nitropack"

import Error from "./Error"

export const baseFetch = <T>(
    request: NitroFetchRequest
) => useFetch<T, FetchError<Error>>(
    request,
    {
        baseURL: useRuntimeConfig().public.baseURL,
        onResponseError: async error => {
            const status = error.response.status
            if (status === 401 || status === 403) {
                console.log("---")
                console.log("Invalid token provided")
                console.log("Redirecting")
                useRouter().replace("/error")
            }
        }
    }
)