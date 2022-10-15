import { FetchResponse, FetchError } from 'ohmyfetch';

import Error from "./Error"

export interface When<T> {
    onSuccess(data: T): void
    onFailure(error: Error): void
    onNull(): void
}

export abstract class Result<T> {
    handle(when: Partial<When<T>>): void {
        if (this instanceof Ignore<T>) return
        if ((this instanceof Failure<T>) && when.onFailure) {
            when.onFailure(this.error)
        } else if (this instanceof Success<T>) {
            const data = this.data
            if (data && when.onSuccess) {
                when.onSuccess(data)
            } else if (when.onNull) {
                when.onNull()
            } else {
                console.log("No handler supplied")
            }
        }
    }
}
class Ignore<T> extends Result<T> { }
class Success<T> extends Result<T> {
    data: T
    constructor(data: T) {
        super();
        this.data = data
    }
}
class Failure<T> extends Result<T> {
    error: Error
    constructor(error: Error) {
        super()
        this.error = error
    }
}

export default async function wrapper<T>(callback: () => Promise<FetchResponse<T>>): Promise<Result<T | null>> {
    try {
        const response = await callback()
        return new Success(response._data ?? null)
    } catch (e) {
        if (e instanceof FetchError<Error>) {
            const status = e.response?.status ?? -1
            if (status === 401 || status === 403) return new Ignore()
            const data = e.data ?? {}
            return new Failure(
                {
                    message: data["message"] ?? "Unknown error",
                    code: data["code"] ?? -1
                }
            )
        }
        return new Failure(
            {
                message: "Unknown error",
                code: -1
            }
        )
    }
}