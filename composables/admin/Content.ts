export interface ContentRequest {
    id: number,
    data: string,
    background: string,
    title: string,
    description: string,
    created: Date,
    until: Date
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