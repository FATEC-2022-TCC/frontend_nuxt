import Error from "./Error"

type Type<T> = {
    data?: T,
    error?: Error
}

interface WhenResult<T> {
    onSuccess(data?: T)
    onFailure(error: Error)
}

export default class Result<T> {
    private readonly type: Type<T>

    private constructor(type: Partial<Type<T>>) {
        this.type = type
    }

    public when(whenResult: WhenResult<T>) {
        const { error, data } = this.type
        if (error) {
            whenResult.onFailure(error)
        } else {
            whenResult.onSuccess(data)
        }
    }

    public static success<T>(data: T): Result<T> {
        return new Result<T>({ data })
    }

    public static error<T>(error: Error): Result<T> {
        return new Result<T>({ error })
    }
}