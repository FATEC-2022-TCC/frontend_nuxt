export interface NewAnimalRequest {
    profilePic: string,
    name: string,
    species: string,
    gender: string,
    age: string,
    size: string,
    about: string
}

export interface UpdateAnimalRequest {
    id: number,
    profilePic: string,
    name: string,
    species: string,
    gender: string,
    age: string,
    size: string,
    about: string,
    adopted: Boolean
}

export interface AnimalResponse {
    id: number,
    profilePic: string,
    name: string,
    species: string,
    gender: string,
    age: string,
    size: string,
    about: string,
    created: Date,
    adopted: Boolean
}

export interface AnimalProjection {
    id: number,
    profilePic: string,
    name: string,
    species: string,
    adopted: Boolean
}