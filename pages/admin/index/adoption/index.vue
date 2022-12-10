<script setup lang="ts">
import { SearchAdoptionProjectionResponse } from '~~/composables/admin/Adoption';

const search = ref("")
const gender = ref("")
const size = ref("")
const status = ref(0)
const page = ref(1)

const pagination = ref<SearchAdoptionProjectionResponse>({
    page: emptyPage(),
    statuses: []
})

const hasRemoteError = ref(false)

const start = () => searchAdoptionProjection(status.value, search.value, gender.value, size.value, page.value).then(handle({
    onSuccess: onSuccess(pagination),
    onFailure: onFailure(hasRemoteError)
}))

watch(status, start)
watch(gender, start)
watch(size, start)

start()

const onRequestsView = (id: number) => navigateTo(`adoption/requests?id=${id}`)

</script>

<template>
    <tail-loading-page class="flex flex-col gap-4 p-4 pb-32" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl self-start">
            Adoção
        </h1>
        <tail-input-search v-model="search" @on-search="page = 1; start()" />
        <tail-select :data="pagination.statuses" :visual-transform="status => status.description"
            :value-transform="status => status.code" v-model="status" />
        <tail-select :data="['Macho', 'Fêmea']" v-model="gender">
            <option value="">
                Gênero do animal
            </option>
        </tail-select>
        <tail-select :data="['Pequeno', 'Médio', 'Grande']" v-model="size">
            <option value="">
                Porte do animal
            </option>
        </tail-select>
        <div class="flex-1 flex flex-col gap-4 justify-between">
            <div class="flex gap-4 justify-center">
                <tail-admin-adoption-projection v-for="p in pagination.page.items" :projection="p"
                    @click="navigateTo(`/admin/adoption/view?id=${p.id}`)" @on-requests-view="onRequestsView" />
            </div>
            <tail-pagination class="self-center" v-model="page" @update:model-value="start" :min-page="1"
                :max-page="pagination.page.pages" />
        </div>
        <tail-fab-add @click="navigateTo('adoption/add')" />
    </tail-loading-page>
</template>