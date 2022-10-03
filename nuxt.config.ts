// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    target: 'server',
    modules: [
        '@kevinmarrec/nuxt-pwa'
    ],
    pwa: {
        meta: {
            name: "Animais"
        },
        workbox: {
            enabled: true
        }
    }
})
