export interface NewAnimalRequest {
    name: string,
    age: string,
    species: string,
    gender: string,
    size: string,
    about: string,
    images: string,
    profile: string
}

export interface UpdateAnimalRequest {
    id: number,
    name: string,
    age: string,
    species: string,
    gender: string,
    size: string,
    about: string,
    images: string,
    profile: string,
    adopted: Boolean
}

export interface AnimalResponse {
    id: number,
    name: string,
    age: string,
    species: string,
    gender: string,
    size: string,
    about: string,
    images: string,
    profile: string,
    created: Date,
    adopted: Boolean
}

export interface AnimalProjection {
    id: number,
    name: string,
    species: string,
    profile: string,
    adopted: Boolean
}