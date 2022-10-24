import { get, post, put, del } from "../api"

import {
    NewAnimalRequest,
    UpdateAnimalRequest,
    AnimalResponse,
    AnimalProjection
} from "./Animal"

export const addAnimal = (body: NewAnimalRequest) => post<AnimalResponse>("/user/animal", body)

export const getAnimal = (id: string) => get<AnimalResponse>(argsToURL("/user/animal/{id}", { id }))

export const updateAnimal = (body: UpdateAnimalRequest) => put<AnimalResponse>("/user/animal", body)

export const deleteAnimal = (id: string) => del<null>(argsToURL("/user/animal/{id}", { id }))

export const getAnimalProjection = () => get<Array<AnimalProjection>>("/user/animal/projection")