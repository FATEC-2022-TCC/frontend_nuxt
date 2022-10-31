export interface NewAnimalRequest {
    picture: string,
    name: string,
    specie: string,
    gender: string,
    age: string,
    size: string,
    about: string
}

export interface UpdateAnimalRequest {
    id: number,
    picture: string,
    name: string,
    specie: string,
    gender: string,
    age: string,
    size: string,
    about: string
}

export interface AnimalResponse {
    id: number,
    picture: string,
    name: string,
    specie: string,
    gender: string,
    age: string,
    size: string,
    about: string,
    created: Date
}

export interface AnimalProjection {
    id: number,
    picture: string,
    name: string,
    specie: string
}