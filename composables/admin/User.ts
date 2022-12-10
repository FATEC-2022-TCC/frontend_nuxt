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
    authority: string,
    isActive: boolean,
    isValidated: boolean,
    privateInfo: PrivateInfo
}

export interface PrivateInfo {
    id: number,
    email: string,
    telephony: string,
    identification: string,
    address: string,
    picture: string
}

export interface UpdateUserRequest {
    id: number,
    name: string,
    authority: string,
    isActive: boolean,
    isValidated: boolean,
    privateInfo: UpdateUserPrivateInfoRequest
}

export interface UpdateUserPrivateInfoRequest {
    email: string,
    telephony: string,
    identification: string,
    address: string,
    picture: string
}

export interface UpdateUserPasswordRequest {
    id: number,
    password: string
}