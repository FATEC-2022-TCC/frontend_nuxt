import { post } from "../api"

import { LoginRequest, LoginResponse } from "./Login";

import { SignUpRequest } from "./SignUp";

export const login = (body: LoginRequest) => post<LoginResponse>("/user/login", body)

export const signup = (body: SignUpRequest) => post<null>("/user", body)