<script setup lang="ts">
import { ContentProjection } from '~~/composables/admin/Content'
defineProps<{
    projection: ContentProjection
}>()
defineEmits<{
    (event: 'onEdit', value: number): void
    (event: 'onDelete', value: number): void
}>()
</script>

<template>
    <div
        class=
        "
            w-64
            h-96
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
        <img v-if="projection.background" :src="projection.background" class="h-32">
        <h1 class="font-amatic-sc text-4xl">{{ projection.title }}</h1>
        <p class="text-center">{{ projection.description }}</p>
        <div class="self-end space-x-2 pb-2">
            <icon @click.stop="$emit('onEdit', projection.id)" name="ant-design:edit-filled" size="2rem" class="hover:cursor-pointer text-blue-violet" />
            <icon @click.stop="$emit('onDelete', projection.id)" name="ant-design:close-circle-filled" size="2rem" class="hover:cursor-pointer text-red" />
        </div>
    </div>
</template>