export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            baseURL: 'http://localhost:8080'
        }
    },
    ssr: false,
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
        overwriting: true,
        download: true
    }
})
