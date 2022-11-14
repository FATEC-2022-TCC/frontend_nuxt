<script setup lang="ts">
import { SearchAdoptionProjectionResponse } from '~~/composables/admin/Adoption';

const search = ref("")
const status = ref(0)
const page = ref(1)

const pagination = ref<SearchAdoptionProjectionResponse>({
    page: emptyPage(),
    statuses: []
})

const hasRemoteError = ref(false)

const getAdoption = () => searchAdoptionProjection(status.value, search.value, page.value).then(handle({
    onSuccess: onSuccess(pagination),
    onFailure: onFailure(hasRemoteError)
}))

watch(status, getAdoption)

getAdoption()
</script>

<template>
    <div class="flex flex-col p-4 pb-32">
        <div class="flex flex-col items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Adoção
            </h1>
            <br>
            <tail-input-search v-model="search" @on-search="page = 1; getAdoption()" />
            <tail-select class="mt-2"
                :data="pagination.statuses"
                :visual-transform="status => status.description"
                :value-transform="status => status.code"
                v-model="status"
            />
        </div>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <br>
            <div class="flex flex-wrap gap-4 justify-center flex-1">
                <tail-admin-adoption-projection
                    @on-edit="navigateTo(`/admin/adoption/edit?id=${$event}`)"
                    v-for="p in pagination.page.items"
                    :projection="p"
                />
            </div>
            <br>
            <tail-pagination class="self-center" v-model="page" @update:modelValue="getAdoption"
                :min-page="1" :max-page="pagination.page.pages" />
        </div>
        <tail-error class="mt-2" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
        <tail-fab-add @click="navigateTo('adoption/add')" />
    </div>
</template>