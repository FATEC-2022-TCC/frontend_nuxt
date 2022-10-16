import { Result, When } from "./api/wrapper";

export { login, signup } from "./normal"
export { uploadFile } from "./admin"

export const handle = <T>(when: Partial<When<T>>) => (result: Result<T>) => result.handle(when)