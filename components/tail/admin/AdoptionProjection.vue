<script setup lang="ts">
import { AdoptionProjection } from '~~/composables/public/Adoption';
defineProps<{
    projection: AdoptionProjection
}>()
defineEmits<{
    (event: 'onRequestsView', value: number): void
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
        <img class="rounded-t-lg object-fill" v-if="projection.picture" :src="projection.picture">
        <div class="flex flex-col p-2">
            <h1 class="text-center font-amatic-sc text-4xl">{{ projection.name }}</h1>
            <icon @click.stop="$emit('onRequestsView', projection.id)" name="ant-design:folder-open-filled" size="2rem"
                class="self-end hover:text-burnt-yellow hover:cursor-pointer text-blue-violet" />
        </div>
    </div>
</template>