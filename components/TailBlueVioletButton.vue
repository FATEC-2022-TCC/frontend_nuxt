<script setup lang="ts">
defineProps({
    title: String
})
</script>

<template>
    <tail-base-button class="bg-blue-violet text-white border-2 border-blue-violet" :title="title" />
</template>