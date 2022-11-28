<script setup lang="ts">
import { UserProjection } from '~~/composables/admin/User';
defineProps<{
    projection: UserProjection
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
        ">
        <h1 class="font-amatic-sc text-4xl">{{ projection.name }}</h1>
        <p class="text-center">{{ projection.username }}</p>
        <p class="text-center">O usuário {{ projection.isActive ? '' : 'não'}} está ativo</p>
        <icon
            @click.stop="$emit('onEdit', projection.id)"
            name="ant-design:edit-filled"
            size="2rem"
            class="self-end pb-2 text-blue-violet hover:cursor-pointer hover:text-burnt-yellow"
        />
    </div>
</template>