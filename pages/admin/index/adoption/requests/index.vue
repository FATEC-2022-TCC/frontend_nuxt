<script setup lang="ts">
import { 
    SearchAdoptionRequestProjectionResponse
} from '~~/composables/admin/AdoptionRequest';

const route = useRoute()

const search = ref("")
const page = ref(1)
const status = ref(0)

const pagination = ref<SearchAdoptionRequestProjectionResponse>({
    page: emptyPage(),
    statuses: []
})

const hasRemoteError = ref(false)

const id = route.query["id"]?.toString() ?? ''

if (!id) navigateTo('/admin/adoption')
else start()

function start() {
    searchAdoptionRequestProjection(id, search.value, status.value, page.value).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(pagination)
    }))
}

function paramChange() {
    page.value = 1
    start()
}

watch(status, paramChange)
</script>

<template>
    <tail-loading-page class="flex flex-col gap-4 p-4" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl self-start">
            Requisições de adoção
        </h1>
        <tail-button-blue-violet title="Visualizar animal" @click="navigateTo(`view?id=${id}`)" />
        <tail-input-search v-model="search" @on-search="page = 1; start()" />
        <tail-select
            :data="pagination.statuses"
            :visual-transform="status => status.description"
            :value-transform="status => status.code"
            v-model="status"
        />
        <div class="flex-1 flex flex-col gap-4">
            <tail-admin-adoption-request-projection
                v-for="p in pagination.page.items"
                :projection="p"
                @click="navigateTo(`requests/view?id=${p.id}&animal=${id}`)"
            />
        </div>
        <tail-pagination
            class="self-center"
            v-model="page"
            @update:model-value="start"
            :min-page="1"
            :max-page="pagination.page.pages"
        />
    </tail-loading-page>
</template>