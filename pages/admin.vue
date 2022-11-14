<script setup lang="ts">
definePageMeta({
    middleware: [
        "empty",
        "adminauth"
    ]
})
</script>

<template>
    <div>
        <nuxt-page />
    </div>
</template>