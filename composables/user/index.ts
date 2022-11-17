import { get, post, put, del } from "../api"
import Page from "../api/Page"

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

export const getAnimalProjection = (text: string, page: number) => get<Page<AnimalProjection>>(
    "/user/animal/projection",
    {
        query: {
            text,
            page
        }
    }
)

// --

export const requestAdoption = (id: string) => get<never>("/user/adoption/request", { query: { id } })