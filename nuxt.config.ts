export default defineNuxtConfig({
    ssr: true,
    runtimeConfig: {
        public: {
            baseURL: 'http://localhost:8080',
            publicImages: 'http://localhost:8080/public/images/',
            webSocket: 'ws://localhost:8080/ws'
        }
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts',
        'nuxt-icon',
        '@kevinmarrec/nuxt-pwa'
    ],
    pwa: {
        meta: {
            name: "Animais"
        },
        workbox: {
            enabled: false
        }
    },
    googleFonts: {
        families: {
            "Amatic SC": true,
            "Nunito": true
        },
        overwriting: false,
        download: false
    }
})
