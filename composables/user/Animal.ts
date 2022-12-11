import {
    CategoryResponse
} from "./Category"

export interface NewAnimalRequest {
    picture: string,
    name: string,
    categoryId: number,
    gender: string,
    age: string,
    size: string,
    description: string
}

export interface UpdateAnimalRequest {
    id: number,
    picture: string,
    name: string,
    categoryId: number,
    gender: string,
    age: string,
    size: string,
    description: string
}

export interface AnimalResponse {
    id: number,
    picture: string,
    name: string,
    specie: string,
    gender: string,
    age: string,
    size: string,
    description: string,
    created: string,
    category: CategoryResponse
}

export interface AnimalProjection {
    id: number,
    picture: string,
    name: string
}