<script setup lang="ts">
import { AdoptionProjection } from '~~/composables/admin/Adoption'
defineProps<{
    projection: AdoptionProjection
}>()
defineEmits<{
    (event: 'onEdit', value: number): void
    (event: 'onDelete', value: number): void
}>()
</script>

<template>
    <div class="
            flex
            flex-col
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
        <div class="flex flex-col items-center p-4">
            <h1 class="font-amatic-sc text-4xl">{{ projection.name }}</h1>
            <icon @click.stop="$emit('onEdit', projection.id)" name="ant-design:eye-filled" size="2rem"
                class="text-blue-violet hover:cursor-pointer self-end" />
        </div>
    </div>
</template>