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

const getAdoption = () => searchAdoptionProjection(search.value, page.value).then(handle({
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
            <select class="w-full border-2 rounded p-2 text-blue-violet text-xl mt-2" v-model="status">
                <option v-for="status in pagination.statuses" :value="status.code">
                    {{ status.description }}
                </option>
            </select>
        </div>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <div class="flex flex-wrap justify-center flex-1">
                {{ pagination }}
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