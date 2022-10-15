<script setup lang="ts">
definePageMeta({
    middleware: () => navigateTo("/home")
})
const state = ref(false)
const files = ref(new Array<File>())
</script>

<template>
    <tail-file-input v-model="files" />
    <tail-heart v-model="state" />
</template>