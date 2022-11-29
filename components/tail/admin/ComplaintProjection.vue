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
            w-64
        ">
        <p class="text-center">{{ projection.local }}</p>
        <br>
        <p class="text-center truncateLines"> {{ projection.description }} </p>
        <br>
        <p class="text-center">{{ formatDate(projection.created) }}</p>
    </div>
</template>

<style>
.truncateLines {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    -webkit-box-orient: vertical;
}
</style>