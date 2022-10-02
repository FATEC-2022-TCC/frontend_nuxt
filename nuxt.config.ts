// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
