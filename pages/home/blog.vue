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
    <div class="flex-1 flex flex-col p-4">
        <div class="flex flex-col gap-2 items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                BLOG
            </h1>
            <br>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
        </div>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <br>
            <div class="flex flex-wrap gap-4 justify-center flex-1">
                <tail-public-content-projection
                    v-for="p in pagination.items"
                    :projection="p"
                    @click="navigateTo(`content?id=${p.id}`)"
                />
            </div>
            <br>
            <tail-pagination
                class="self-center"
                v-model="page"
                @update:model-value="start"
                :min-page="1"
                :max-page="pagination.pages"
            />
        </div>
        <tail-error class="mt-2" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
    </div>
</template>