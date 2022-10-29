import { Ref } from "vue"
import { Result, When } from "../api/wrapper";
import Error from "../api/Error"

export const handle = <T>(when: Partial<When<T>>) => (result: Result<T>) => result.handle(when)

const regex = /{(\w+)}/
export const argsToURL = (url: string, args: { [key: string]: string }) => url
    .split("/")
    .map(part => {
        const arr = part.match(regex)
        if (arr == null || !arr.length) return part
        const capture = arr[1]
        const arg = args[capture]
        if (!arg) return part
        return arg
    })
    .join("/")

export const fileToBase64 = (file: File): Promise<string> => new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = load => {
        const result = load.target?.result as string ?? ""
        resolve(result)
    }
    reader.readAsDataURL(file)
})

export const base64ToBlob = (base64: string) => fetch(base64).then(res => res.blob())

interface Validator {
    run(): string | boolean
}

export const lengthValidator = <T extends string | Array<any>>(
    notifier: Ref<T>,
    message: string,
    length: number = 0
) => buildValidator(
    notifier,
    data => !!data.length && data.length > length,
    message
)

export const buildValidator = <T>(
    notifier: Ref<T>,
    test: (type: T) => boolean,
    message: string
): Validator => ({
    run: () => !test(notifier.value) && message
})

export const hasError = <T>(
    checks: {
        [Key in keyof T]?: Array<Validator> | Validator
    },
    notifier: Ref<{ [Key in keyof T]?: string }>
): boolean => {
    let hasError = false

    notifier.value = {}
    const object: { [Key in keyof T]?: string } = {}

    external: for (const key in checks) {
        const union = checks[key]
        if (!union) continue
        //I don't understant yet how to differ from T or T[]
        //That beauty shit resolves it for a while
        const arr = [union].flat()
        for (const check of arr) {
            const res = check.run()
            if (!res) continue
            object[key] = res.toString()
            hasError = true
            continue external
        }
    }

    notifier.value = object
    return hasError
}


//to handle
export const onSuccess = <T>(ref: Ref<T>) => (result: T) => ref.value = result

export const onFailure = (ref: Ref<boolean>, also?: () => void) => (error: Error) => {
    console.log(JSON.stringify(error))
    ref.value = true
    if (also) also()
}