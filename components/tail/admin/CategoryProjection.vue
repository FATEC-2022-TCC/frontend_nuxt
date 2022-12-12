<script setup lang="ts">
import { CategoryProjection } from '~~/composables/admin/Category';
defineProps<{
    projection: CategoryProjection
}>()
defineEmits<{
    (event: 'onEdit'): void
}>()
</script>

<template>
    <div class="
            p-4
            flex
            flex-col
            justify-between
            rounded-lg
            shadow-lg
            bg-white
            transition-all
            hover:shadow-2xl
            hover:cursor-pointer
        ">
        <h1 class="font-amatic-sc text-4xl">{{ projection.name }}</h1>
        <p class="text-center">{{ projection.description }}</p>
        <icon
            @click.stop="$emit('onEdit')"
            name="ant-design:edit-filled"
            size="2rem"
            class="self-end pb-2 text-blue-violet hover:cursor-pointer hover:text-burnt-yellow"
        />
    </div>
</template>