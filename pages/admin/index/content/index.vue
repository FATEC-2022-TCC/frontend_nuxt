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

function onClick(projection: ContentProjection) {
    console.log("click", projection)
}

function onDelete(projection: ContentProjection) {
    console.log("delete", projection)
}

function onEdit(projection: ContentProjection) {
    navigateTo(`/admin/content/edit?id=${projection.id}`)
}
</script>

<template>
    <div class="pt-4 pl-2 pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Conteúdo
        </h1>
        <div class="flex flex-wrap justify-center">
            <tail-admin-content-projection 
                class="mt-4 mr-2" 
                v-for="p in projections" 
                :projection="p" 
                @onClick="onClick"
                @onDelete="onDelete" 
                @onEdit="onEdit" />
        </div>
        <tail-fab-add @click="() => navigateTo('content/add')" />
    </div>
</template>