<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
console.log(route.name)
</script>

<template>
    <h1>
        Hello World
    </h1>
</template>