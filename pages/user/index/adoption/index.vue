<script setup lang="ts">
import { AdoptionProjection } from '~~/composables/user/Adoption';

const search = ref("")
const page = ref(1)
const pagination = ref(emptyPage<AdoptionProjection>())

const hasRemoteError = ref(false)

function start() {
    getUserAdoptionProjection(search.value, page.value).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(pagination)
    }))
}

start()
</script>

<template>
    <tail-loading-page class="flex flex-col gap-4 p-4 pb-32" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl self-start">
            Minhas requisições de adoção
        </h1>
        <tail-input-search v-model="search" @on-search="page = 1; start()" />
        <div class="flex-1 flex flex-col gap-4 justify-between">
            <div class="flex gap-4 justify-center">
                <tail-user-adoption-projection
                    v-for="p in pagination.items"
                    :projection="p"
                    @click="navigateTo(`adoption/view?id=${p.id}`)"
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