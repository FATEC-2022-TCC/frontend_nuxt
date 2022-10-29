import { FetchResponse, FetchError } from 'ohmyfetch';

export interface When<T> {
    onSuccess(data: T): void
    onNullSucess(): void
    onFailure(status: number): void
    finally(): void
}

export abstract class Result<T> {
    handle(when: Partial<When<T>>): void {
        if (this instanceof Ignore<T>) return
        if ((this instanceof Failure<T>) && when.onFailure) {
            when.onFailure(this.status)
        } else if (this instanceof Success<T>) {
            const data = this.data
            if (data && when.onSuccess) {
                when.onSuccess(data)
            } else if (when.onNullSucess) {
                when.onNullSucess()
            } else {
                console.log("No handler supplied")
            }
        }
        if (when.finally) when.finally()
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
    status: number
    constructor(status: number) {
        super()
        this.status = status
    }
}

//aaa
//I'm only training typescript features
//Kotlin is better
const construct = <A, B>(constructor: new (a: A) => B) => (a: A) => new constructor(a)
const extract = <T>(field: keyof T) => (a: T) => a[field]
// const why = <T, K extends keyof T, V extends T[K], C>(
//     promise: () => Promise<T>,
//     field: K,
//     constructor: new (value: V) => C
// ) => promise()
//     .then(data => data[field])
//     .then(data => new constructor(data))

export default async function wrapper<T>(callback: () => Promise<FetchResponse<T>>): Promise<Result<T>> {
    try {
        return await callback().then(extract('_data')).then(construct(Success))
    } catch (e) {
        let status = -1
        if (e instanceof FetchError<Error>) status = e.response?.status ?? -1
        if (status === 401 || status === 403) return new Ignore()
        return new Failure(status)
    }
}