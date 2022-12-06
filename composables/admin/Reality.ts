export interface RealityProjection {
    id: number,
    title: string,
    background: string,
    isVisible: string
}

export interface NewRealityRequest {
    data: string,
    scale: number,
    title: string,
    description: string,
    background: string,
    images: Array<string>
}