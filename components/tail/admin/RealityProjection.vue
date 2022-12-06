<script setup lang="ts">
import { RealityProjection } from '~~/composables/admin/Reality'
defineProps<{
    projection: RealityProjection
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
        <h1 class="text-center font-amatic-sc text-4xl">{{ projection.title }}</h1>
        <p class="text-center">O modelo {{ projection.isVisible ? '' : 'não'}} está visível</p>
        <div class="flex self-end p-2">
            <icon @click.stop="$emit('onEdit', projection.id)" name="ant-design:edit-filled" size="2rem"
                class="hover:cursor-pointer text-blue-violet" />
            <icon @click.stop="$emit('onDelete', projection.id)" name="ant-design:close-circle-filled" size="2rem"
                class="hover:cursor-pointer text-red" />
        </div>
    </div>
</template>