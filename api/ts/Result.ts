import Error from "./Error"

type Type<T> = {
    data?: T,
    error?: Error
}

export default class Result<T> {
    private readonly type: Type<T>

    private constructor(type: Partial<Type<T>>) {
        this.type = type
    }

    public takeIfSuccess(block: (data?: T) => void): this {
        if (this.type.error) return this
        const { data } = this.type
        block(data)
        return this
    }

    public takeIfError(block: (error: Error) => void): this {
        const { error } = this.type
        if (!!error) block(error)
        return this
    }

    public static success<T>(data: T): Result<T> {
        return new Result<T>({ data })
    }

    public static error<T>(error: Error): Result<T> {
        return new Result<T>({ error })
    }
}