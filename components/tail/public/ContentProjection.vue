<script setup lang="ts">
import { ContentProjection } from '~~/composables/admin/Content';
defineProps<{
    projection: ContentProjection
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
        ">
        <img class="rounded-t-lg object-fill" v-if="projection.background" :src="projection.background">
        <div class="p-4 space-y-2">
            <h1 class="text-center font-amatic-sc text-4xl">{{ projection.title }}</h1>
            <h1 class="text-center text-xl">{{ projection.description }}</h1>
        </div>
    </div>
</template>