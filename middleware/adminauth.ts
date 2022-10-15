export default defineNuxtRouteMiddleware((to, from) => {
    const session = useSession()
    if (session.value.type != TokenType.ADMIN) {
        console.log("Admin aborted")
        return showError("Acesso negado!")
    }
})