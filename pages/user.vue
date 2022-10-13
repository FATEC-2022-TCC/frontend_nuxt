<script setup lang="ts">
definePageMeta({
    middleware: [
        "empty",
        "userauth"
    ]
})
</script>

<template>
    <nuxt-page class="h-screen"/>
</template>