<script setup lang="ts">
import { AdoptionRequestProjection } from '~~/composables/admin/AdoptionRequest';
defineProps<{
    projection: AdoptionRequestProjection
}>()
</script>

<template>
    <div>
        <div class="
            flex
            p-4
            rounded-lg
            shadow-lg
            bg-white
            transition-all
            hover:shadow-2xl
            hover:cursor-pointer
        ">
            <h1 class="font-amatic-sc text-4xl">Requisitado por:</h1>
            <h1 class="font-amatic-sc text-4xl">{{ projection.createdBy }}</h1>
        </div>
    </div>
</template>