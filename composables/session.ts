export const enum TokenType {
    NONE,
    NORMAL,
    ADMIN
}

export const useSession = () => useCookie<{ token: string, type: TokenType }>(
    'session',
    {
        default: () => ({ token: "", type: TokenType.NONE })
    }
)