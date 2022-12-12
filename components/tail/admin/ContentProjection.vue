<script setup lang="ts">
import { ContentProjection } from '~~/composables/admin/Content'
defineProps<{
    projection: ContentProjection
}>()
defineEmits<{
    (event: 'onEdit'): void
    (event: 'onDelete'): void
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
        <div class="p-2">
            <h1 class="text-center font-amatic-sc text-4xl">{{ projection.title }}</h1>
            <p class="text-center">{{ projection.description }}</p>
        </div>
        <div class="flex self-end p-2">
            <icon @click.stop="$emit('onEdit')"
                name="ant-design:edit-filled"
                size="2rem"
                class="hover:cursor-pointer hover:text-burnt-yellow text-blue-violet"
            />
            <icon @click.stop="$emit('onDelete')"
                name="ant-design:close-circle-filled"
                size="2rem"
                class="hover:cursor-pointer text-red"
            />
        </div>
    </div>
</template>