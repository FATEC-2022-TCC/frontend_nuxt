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
    <div class="flex flex-col p-4 pb-32">
        <div class="flex flex-col gap-2 items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Adoção
            </h1>
            <br>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
            <tail-select
                :data="pagination.statuses"
                :visual-transform="status => status.description"
                :value-transform="status => status.code"
                v-model="status"
            />
            <div class="w-full flex gap-2">
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
            </div>
        </div>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <br>
            <div class="flex flex-wrap gap-4 justify-center flex-1">
                <tail-admin-adoption-projection
                    @click="navigateTo(`/admin/adoption/edit?id=${p.id}`)"
                    @on-requests-view="onRequestsView"
                    v-for="p in pagination.page.items"
                    :projection="p"
                />
            </div>
            <br>
            <tail-pagination
                class="self-center"
                v-model="page"
                @update:model-value="start"
                :min-page="1"
                :max-page="pagination.page.pages"
            />
        </div>
        <tail-error class="mt-2" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
        <tail-fab-add @click="navigateTo('adoption/add')" />
    </div>
</template>