<script setup lang="ts">
import { AnimalProjection } from '~~/composables/user/Animal'
defineProps<{
    projection: AnimalProjection
}>()
</script>

<template>
    <div class="
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
                "
                @click="$emit('onClick', projection)"
                >
        <img v-if="projection.picture" :src="projection.picture" class="h-32">
        <h1 class="font-amatic-sc text-4xl">{{ projection.name }}</h1>
        <p class="text-center">{{ projection.specie }}</p>
        <div class="self-end space-x-2 pb-2">
            <icon @click.stop="$emit('onEdit', projection)" name="ant-design:edit-filled" size="2rem" class="hover:cursor-pointer text-blue-violet" />
            <icon @click.stop="$emit('onDelete', projection)" name="ant-design:close-circle-filled" size="2rem" class="hover:cursor-pointer text-red" />
        </div>
    </div>
</template>