<script setup lang="ts">
import { ComplaintProjection } from '~~/composables/admin/Complaint'
defineProps<{
    projection: ComplaintProjection
}>()
defineEmits<{
    (event: 'onEdit', value: number): void
}>()
</script>

<template>
    <div
        class=
        "
            p-4
            flex
            flex-col
            rounded-lg
            shadow-lg
            bg-white
            transition-all
            hover:shadow-2xl
            hover:cursor-pointer
            w-64
        ">
        <p class="text-center">{{ projection.local }}</p>
        <p class="text-center truncate max-w-full"> {{ projection.description }} </p>
        <p>{{ formatDate(projection.created) }}</p>
        <icon @click.stop="$emit('onEdit', projection.id)" name="ant-design:eye-filled" size="2rem" class="text-blue-violet hover:cursor-pointer self-end" />
    </div>
</template>