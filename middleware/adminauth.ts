export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token')
    if (!token.value) {
        console.log("---")
        console.log("Protected route intercepted")
        console.log("No token provided")
        console.log("Redirecting")
        return showError("Acesso negado!")
    }
})