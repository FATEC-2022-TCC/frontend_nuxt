import { Base64 } from "../api/Base64"

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

export interface Reality {
    id: number,
    data: string,
    scale: number,
    title: string,
    description: string,
    background: string,
    isVisible: boolean,
    images: Array<Base64>
}