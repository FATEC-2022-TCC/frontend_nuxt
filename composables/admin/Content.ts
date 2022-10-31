export interface NewContentRequest {
    data: string,
    background: string,
    title: string,
    description: string,
    until: Date
}

export interface UpdateContentRequest {
    id: string,
    data: string,
    background: string,
    title: string,
    description: string,
    until: Date
}

export interface ContentResponse {
    id: number,
    data: string,
    background: string,
    title: string,
    description: string,
    created: string,
    until: string
}

export interface ContentProjection {
    id: number,
    title: string,
    description: string,
    background: string
}