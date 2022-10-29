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
    { body, query }: {
        body?: Body,
        query?: {
            [key: string]: any
        }
    } | undefined = {}
) => $fetch.raw<T>(
    url,
    {
        baseURL: useRuntimeConfig().public.baseURL,
        method,
        body,
        headers: getHeaders(),
        query,
        cache: "no-cache",
        onResponseError: async error => {
            const status = error.response.status
            if (status === 401 || status === 403) {
                const session = useSession()
                session.value = {
                    token: "",
                    type: TokenType.NONE
                }
                showError("Sessão expirada. Por favor, faça o login novamente!")
            }
        }
    }
)