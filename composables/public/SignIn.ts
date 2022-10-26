export interface SignInRequest {
    username: string,
    password: string
}

export interface SignInResponse {
    token: string,
    type: string
}