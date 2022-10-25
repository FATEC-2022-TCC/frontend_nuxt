import { Result, When } from "./api/wrapper";

export {
    getContentProjectionInEvidence,
    getPublicContent,
} from "./public"

export {
    login,
    signup
} from "./normal"

export {
    addContent,
    getContent,
    updateContent,
    deleteContent,
    getContentProjection
} from "./admin"

export {
    addAnimal,
    getAnimal,
    updateAnimal,
    deleteAnimal,
    getAnimalProjection
} from "./user"

export {
    fileToBase64,
    errorsToObject,
    set
} from "./utils"

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