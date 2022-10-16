declare type Method = "GET" | "POST" | "PUT" | "DELETE"

export type Body = RequestInit['body'] | Record<string, any>

const getHeaders = (): HeadersInit => {
    const session = useSession()
    const token = session.value.token
    if (!token) return []
    return {
        "Authorization": `Bearer ${token}`
    }
}

export const baseFetch = <T extends any>(
    url: string,
    method: Method,
    body?: Body,
) => $fetch.raw<T>(
    url,
    {
        baseURL: useRuntimeConfig().public.baseURL,
        method,
        body,
        headers: getHeaders(),
        cache: "no-cache",
        onResponseError: async error => {
            const status = error.response.status
            if (status === 401 || status === 403) {
                console.log("---")
                console.log("Invalid token provided")
                console.log("Redirecting")
                showError("Sessão expirada. Por favor, faça o login novamente!")
            }
        }
    }
)