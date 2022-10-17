<script setup lang="ts">
import { ContentProjection } from '~~/composables/admin/Content'
const projections = ref<Array<ContentProjection>>([])

getContentProjection().then(handle({
    onFailure: error => {
        alert(JSON.stringify(error))
    },
    onSuccess: result => {
        projections.value = result
    }
}))
</script>

<template>
    <div class="pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Conteúdo
        </h1>
        <div class="flex flex-wrap justify-center">
            <div v-for="p in projections" 
                class="
                    mt-4
                    mr-2
                    w-64
                    h-96
                    rounded
                    p-2
                    flex
                    flex-col
                    items-center
                    justify-center
                    space-y-2
                    border-2
                    border-blue-violet
                    cursor-pointer
                    transition-shadow
                    hover:shadow-2xl
                ">
                <img v-if="p.background" :src="p.background" class="h-32">
                <h1 class="font-amatic-sc text-4xl">{{ p.title }}</h1>
                <p class="text-center">{{ p.description }}</p>
            </div>
        </div>
        <tail-fab-add @click="() => navigateTo('content/add')" />
    </div>
</template>