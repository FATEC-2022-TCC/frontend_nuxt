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
    <div class="flex flex-col p-4 pb-32">
        <div class="flex flex-col gap-4">
            <h1 class="font-amatic-sc text-6xl self-start">
                Realidade aumentada
            </h1>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
            <div class="flex items-center justify-between">
                <p>O modelo está {{ isVisible ? 'visível' : 'escondido' }}</p>
                <tail-switch v-model="isVisible" />
            </div>
        </div>
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1 justify-between">
            <div class="flex flex-col items-center gap-4">
                <tail-admin-reality-projection
                    v-for="p in pagination.items"
                    :projection="p"
                    @click="navigateTo(`/admin/users/view?id=${p.id}`)"
                    @on-edit="navigateTo(`/admin/users/edit?id=${$event}`)"
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
            <tail-fab-add @click="navigateTo('reality/add')" />
        </div>
        <tail-error v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
    </div>
</template>