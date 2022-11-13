<script setup lang="ts">
import { CategoryProjection } from '~~/composables/admin/Category';
defineProps<{
    projection: CategoryProjection
}>()
defineEmits<{
    (event: 'onEdit', value: number): void
    (event: 'onDelete', value: number): void
}>()
</script>

<template>
    <div class="
            w-full
            p-2
            rounded
            flex
            flex-col
            justify-between
            items-center
            space-y-2
            border
            border-blue-violet
            cursor-pointer
            transition-shadow
            hover:shadow-2xl
        ">
        <h1 class="font-amatic-sc text-4xl">{{ projection.name }}</h1>
        <p class="text-center">{{ projection.description }}</p>
        <icon @click.stop="$emit('onEdit', projection.id)" name="ant-design:edit-filled" size="2rem"
            class="self-end pb-2 hover:cursor-pointer text-blue-violet" />
    </div>
</template>