<script setup lang="ts">
import { AdoptionProjection } from '~~/composables/user/Adoption';
defineProps<{
    projection: AdoptionProjection
}>()
</script>

<template>
    <div class="
            flex
            flex-col
            justify-between
            rounded-lg
            shadow-lg
            bg-white
            transition-all
            hover:shadow-2xl
            hover:cursor-pointer
            w-64
            h-72
        ">
        <img class="rounded-t-lg object-fill" v-if="projection.picture" :src="projection.picture">
        <h1 class="m-auto font-amatic-sc text-4xl">{{ projection.name }}</h1>
    </div>
</template>