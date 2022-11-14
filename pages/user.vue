<script setup lang="ts">
definePageMeta({
    middleware: [
        "empty",
        "userauth"
    ]
})
</script>

<template>
    <div>
        <nuxt-page />
    </div>
</template>