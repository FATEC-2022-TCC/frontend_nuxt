import Response from "./Response"

declare type Method = "GET" | "POST" | "PUT" | "DELETE"

//headers["Authorization"] = `Bearer ${token}`

export type Body = RequestInit['body'] | Record<string, any>

export const baseFetch = <T>(
    url: string,
    method: Method = "GET",
    body?: Body,
) => $fetch.raw<Response<T>>(
    url,
    {
        baseURL: useRuntimeConfig().public.baseURL,
        method,
        body,
        cache: "no-cache",
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

// useFetch<Response<T>, FetchError<Error>>(
//     url,
//     {
//         baseURL: useRuntimeConfig().public.baseURL,
//         method,
//         body,
//         cache: "no-cache",
//         onResponseError: async error => {
//             const status = error.response.status
//             if (status === 401 || status === 403) {
//                 console.log("---")
//                 console.log("Invalid token provided")
//                 console.log("Redirecting")
//                 useRouter().replace("/error")
//             }
//         }
//     }
// )