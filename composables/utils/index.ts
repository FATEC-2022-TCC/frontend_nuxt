import { Ref } from "vue"

export const fileToBase64 = (file: File): Promise<string> => new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = load => {
        const result = load.target?.result as string ?? ""
        resolve(result)
    }
    reader.readAsDataURL(file)
})

export const errorsToObject = <T, V = string>(
    errors: { [Key in keyof T]: [Ref<V>, V, ((v: V) => V | boolean)[]] },
    notifier: Ref<{ [Key in keyof T]?: V }>
): boolean => {
    notifier.value = {}
    const object: { [Key in keyof T]?: V } = {}
    let hasError = false
    for (const key in errors) {
        const [ref, message, customs] = errors[key]
        if (!ref.value) {
            hasError = true
            object[key] = message
            continue
        }
        for (const custom of customs) {
            const message = custom(ref.value)
            if (message && !(typeof message == 'boolean')) {
                hasError = true
                object[key] = message
                continue
            }
        }
    }
    notifier.value = object
    return hasError
}