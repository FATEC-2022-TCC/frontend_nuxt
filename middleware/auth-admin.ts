export default defineNuxtRouteMiddleware((to, from) => {
    const { $config } = useNuxtApp()
    console.log(`Config is ${$config}`)
    navigateTo("/error")
})