<script setup lang="ts">
import { RealityProjection } from '~~/composables/admin/Reality';

const search = ref("")
const isVisible = ref(true)
const page = ref(1)

const pagination = ref(emptyPage<RealityProjection>())

const hasRemoteError = ref(false)

function start() {
    searchRealityProjection(search.value, isVisible.value, page.value).then(handle({
        onSuccess: onSuccess(pagination),
        onFailure: onFailure(hasRemoteError)
    }))
}

watch(isVisible, start)

start()
</script>

<template>
    <tail-loading-page class="flex flex-col gap-4 p-4 pb-32" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl self-start">
            Realidade aumentada
        </h1>
        <tail-input-search v-model="search" @on-search="page = 1; start()" />
        <div class="flex items-center justify-between">
            <p>O modelo está {{ isVisible ? 'visível' : 'escondido' }}</p>
            <tail-switch v-model="isVisible" />
        </div>
        <div class="flex-1 flex flex-col gap-4 justify-between">
            <div class="flex gap-4 justify-center">
                <tail-admin-reality-projection v-for="p in pagination.items" :projection="p"
                    @click="navigateTo(`/admin/reality/view?id=${p.id}`)"
                    @on-edit="navigateTo(`/admin/reality/edit?id=${$event}`)" 
                />
            </div>
            <tail-pagination class="self-center" v-model="page" @update:model-value="start" :min-page="1"
                :max-page="pagination.pages" />
        </div>
        <tail-fab-add @click="navigateTo('reality/add')" />
    </tail-loading-page>
</template>