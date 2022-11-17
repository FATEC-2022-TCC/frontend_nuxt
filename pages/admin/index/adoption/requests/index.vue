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

watch(status, start)
</script>

<template>
 <div class="flex flex-col p-4">
        <div class="flex flex-col gap-2 items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Requisições de adoção
            </h1>
            <br>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
            <tail-select class="mt-2"
                :data="pagination.statuses"
                :visual-transform="status => status.description"
                :value-transform="status => status.code"
                v-model="status"
            />
        </div>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <br>
            <div class="flex flex-col gap-4 flex-1">
                <tail-admin-adoption-request-projection
                    v-for="p in pagination.page.items"
                    :projection="p"
                    @click="navigateTo(`requests/view?id=${p.id}`)"
                />
            </div>
            <br>
            <tail-pagination class="self-center" v-model="page" @update:modelValue="start"
                :min-page="1" :max-page="pagination.page.pages" />
        </div>
        <tail-error class="mt-2" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
    </div>
</template>