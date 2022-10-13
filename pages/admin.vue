<script setup lang="ts">
definePageMeta({
    middleware: [
        "empty",
        "adminauth"
    ]
})
</script>

<template>
    <nuxt-page />
</template>