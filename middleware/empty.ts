export default defineNuxtRouteMiddleware((to, from) => {
    const session = useSession()
    if (!session.value.token || session.value.type == TokenType.NONE) {
        return showError("Acesso negado!")
    }
})