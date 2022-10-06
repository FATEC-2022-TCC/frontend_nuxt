export default defineNuxtConfig({
    ssr: true,
    target: 'server',
    modules: [
        '@kevinmarrec/nuxt-pwa',
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
    ],
    pwa: {
        meta: {
            name: "Animais"
        },
        workbox: {
            enabled: false
        }
    }
})
