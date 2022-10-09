import { FetchResponse, FetchError } from 'ohmyfetch';

import Error from "./Error"
import Response from "./Response"

interface When<T> {
    onSuccess(data: T)
    onFailure(error: Error)
    onNull()
}

export abstract class Result<T> {
    handle(when: Partial<When<T>>) {
        if (this instanceof Ignore<T>) return
        if (this instanceof Failure<T>) {
            when?.onFailure(this.error)
            return
        }
        if (this instanceof Success<T>) {
            const data = this.data
            if (data) {
                when?.onSuccess(data)
            } else {
                when?.onNull()
            }
            return
        }
    }
}
class Ignore<T> extends Result<T> { }
class Success<T> extends Result<T> {
    data: T | null
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

export default async function wrapper<T>(callback: () => Promise<FetchResponse<Response<T>>>): Promise<Result<T>> {
    try {
        const response = await callback()
        if (!response._data) return new Success(null)
        const { data: { value } } = response._data
        return new Success(value)
    } catch (e) {
        if (e instanceof FetchError<Error>) {
            const status = e.response.status
            if (status === 401 || status === 403) return new Ignore()
            const data = e.data
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