<script setup lang="ts">
const route = useRoute()
const id = route.query["id"]
if (!id) navigateTo("/admin/content")
</script>

<template>
    <h1 class="font-amatic-sc text-6xl">
        Editar conteúdo
    </h1>
</template>