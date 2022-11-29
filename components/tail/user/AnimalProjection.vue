<script setup lang="ts">
import { AnimalProjection } from '~~/composables/user/Animal'
defineProps<{
    projection: AnimalProjection
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
        " @click="$emit('onClick', projection)">
        <img class="rounded-t-lg object-fill" v-if="projection.picture" :src="projection.picture">
        <div class="p-2">
            <h1 class="text-center font-amatic-sc text-4xl">{{ projection.name }}</h1>
            <div class="flex justify-end">
                <icon @click.stop="$emit('onEdit', projection)" name="ant-design:edit-filled" size="2rem"
                    class="hover:cursor-pointer text-blue-violet" />
                <icon @click.stop="$emit('onDelete', projection)" name="ant-design:close-circle-filled" size="2rem"
                    class="hover:cursor-pointer text-red" />
            </div>
        </div>
    </div>
</template>