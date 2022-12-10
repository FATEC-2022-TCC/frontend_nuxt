<script setup lang="ts">
import { RealityProjection } from '~~/composables/public/Reality';

const search = ref("")
const page = ref(1)

const pagination = ref(emptyPage<RealityProjection>())
const hasRemoteError = ref(false)

const start = () => searchPublicReality(search.value, page.value).then(handle({
    onSuccess: onSuccess(pagination),
    onFailure: onFailure(hasRemoteError)
}))

start()
</script>

<template>
    <tail-loading-page class="flex-1 flex flex-col" :has-remote-error="hasRemoteError">
        <div class="flex flex-col gap-4 bg-white rounded p-4 pb-4 items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Realidade aumentada
            </h1>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
        </div>
        <div class="flex-1 flex flex-col gap-4 justify-between p-4">
            <div class="flex flex-wrap gap-4 justify-center">
                <tail-public-reality-projection
                    v-for="p in pagination.items"
                    :projection="p"
                    @click="navigateTo(`reality/view?id=${p.id}`)"
                />
            </div>
            <tail-pagination class="self-center" v-model="page" @update:model-value="start" :min-page="1"
                :max-page="pagination.pages" />
        </div>
    </tail-loading-page>
</template>