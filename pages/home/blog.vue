<script setup lang="ts">
import { ContentProjection } from '~~/composables/admin/Content';

const search = ref("")
const page = ref(1)

const pagination = ref(emptyPage<ContentProjection>())

const hasRemoteError = ref(false)

function start() {
    searchPublicContentProjection(search.value, page.value).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(pagination)
    }))
}

start()
</script>

<template>
    <tail-loading-page class="flex-1 flex flex-col" :has-remote-error="hasRemoteError">
        <div class="bg-white flex flex-col gap-4 items-center justify-between p-4">
            <h1 class="font-amatic-sc text-6xl self-start">
                BLOG
            </h1>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
        </div>
        <div class="flex-1 flex flex-col gap-4 justify-between p-4">
            <div class="flex flex-wrap justify-center gap-4">
                <tail-public-content-projection
                    v-for="p in pagination.items"
                    :projection="p"
                    @click="navigateTo(`content?id=${p.id}`)"
                />
            </div>
            <tail-pagination
                class="self-center"
                v-model="page"
                @update:model-value="start"
                :min-page="1"
                :max-page="pagination.pages"
            />
        </div>
    </tail-loading-page>
</template>