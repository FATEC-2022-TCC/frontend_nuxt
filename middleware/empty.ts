export default defineNuxtRouteMiddleware((to, from) => {
    const session = useSession()
    if (!session.value.token || session.value.type == TokenType.NONE) {
        console.log("Empty token aborted")
        return showError("Acesso negado!")
    }
})