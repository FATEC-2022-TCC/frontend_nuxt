export default defineNuxtRouteMiddleware((to, from) => {
    const session = useSession()
    if (session.value.type != TokenType.NORMAL) {
        return showError("Acesso negado!")
    }
})