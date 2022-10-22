export interface ContentRequest {
    data: string,
    background: string,
    title: string,
    description: string,
    until: string
}

export interface ContentResponse {
    id: number,
    data: string,
    background: string,
    title: string,
    description: string,
    created: Date,
    until: Date
}

export interface ContentProjection {
    id: number,
    title: string,
    description: string,
    background: string
}