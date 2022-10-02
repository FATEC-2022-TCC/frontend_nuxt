export default defineNuxtRouteMiddleware((to, from) => {
    const { $config } = useNuxtApp()
    console.log(`Config is ${JSON.stringify($config)}`)
    navigateTo("/error")
})