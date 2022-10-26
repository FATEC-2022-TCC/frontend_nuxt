import { Ref } from "vue"

export const fileToBase64 = (file: File): Promise<string> => new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = load => {
        const result = load.target?.result as string ?? ""
        resolve(result)
    }
    reader.readAsDataURL(file)
})

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

export const set = <T>(ref: Ref<T>) => (result: T) => ref.value = result