export interface UserProjection {
    id: number,
    name: string,
    username: string,
    isActive: boolean
}

export interface User {
    id: number,
    name: string,
    username: string,
    password: string,
    email: string,
    authority: string,
    isActive: boolean,
}

export interface UpdateUserRequest {
    id: number,
    name: string,
    email: string,
    authority: string,
    isActive: boolean,
}

export interface UpdateUserPasswordRequest {
    id: number,
    password: string
}