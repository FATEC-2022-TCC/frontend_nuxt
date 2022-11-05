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
            w-64
            h-48
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
        <p class="text-center">{{ projection.local }}</p>
        <p class="text-center truncate max-w-full"> {{ projection.description }} </p>
        <p>{{ formatDate(projection.created) }}</p>
        <icon @click.stop="$emit('onEdit', projection.id)" name="ant-design:eye-filled" size="2rem" class="text-blue-violet hover:cursor-pointer self-end" />
    </div>
</template>