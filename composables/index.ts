import { Result, When } from "./api/wrapper";

export { 
    login,
    signup
} from "./normal"

export { 
    uploadFile,
    addContent,
    getContentProjection,
    deleteContent
} from "./admin"

export { 
    fileToBase64,
    errorsToObject
} from "./utils"

export const handle = <T>(when: Partial<When<T>>) => (result: Result<T>) => result.handle(when)