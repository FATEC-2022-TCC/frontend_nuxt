import { get, post, put, del } from "../api"
import Page from "../api/Page"

import {
    NewAnimalRequest,
    UpdateAnimalRequest,
    AnimalResponse,
    AnimalProjection
} from "./Animal"

import {
    Adoption,
    AdoptionProjection
} from "./Adoption"

import {
    NewComplaintRequest
} from "./Complaint"

import {
    UserUpdateUserPasswordRequest
} from "./User"

export const addAnimal = (body: NewAnimalRequest) => post<never>("/user/animal", body)

export const getAnimal = (id: string) => get<AnimalResponse>(argsToURL("/user/animal/{id}", { id }))

export const updateAnimal = (body: UpdateAnimalRequest) => put<never>("/user/animal", body)

export const deleteAnimal = (id: string) => del<never>(argsToURL("/user/animal/{id}", { id }))

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

export const requestAdoption = (id: string) => get<never>("/user/adoption/request/create", { query: { id } })

// --

export const getUserAdoptionProjection = (text: string, page: number) => get<Page<AdoptionProjection>>(
    "/user/adoption/projection",
    {
        query: {
            text,
            page
        }
    }
)

export const getUserAdoption = (id: string) => get<Adoption>(argsToURL("/user/adoption/{id}", { id }))

// --

export const addComplaint = (body: NewComplaintRequest) => post<never>("/user/complaint", body)

// --

export const userUpdatePassword = (body: UserUpdateUserPasswordRequest) => put<never>("/user/password", body)