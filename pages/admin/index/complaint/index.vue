<script setup lang="ts">
import { SearchComplaintProjectionResponse } from '~~/composables/admin/Complaint';

const search = ref("")
const status = ref(0)
const page = ref(1)

const pagination = ref<SearchComplaintProjectionResponse>({
    page: emptyPage(),
    statuses: []
})

const hasRemoteError = ref(false)

const getComplaint = () => searchComplaintProjection(status.value, search.value, page.value).then(handle({
    onSuccess: onSuccess(pagination),
    onFailure: onFailure(hasRemoteError)
}))

watch(status, getComplaint)

getComplaint()
</script>

<template>
    <div class="flex flex-col p-4">
        <div class="flex flex-col items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Denúncias
            </h1>
            <br>
            <tail-input-search v-model="search" @on-search="page = 1; getComplaint()" />
            <tail-select class="mt-2"
                :data="pagination.statuses"
                :visual-transform="status => status.description"
                :value-transform="status => status.code"
                v-model="status"
            />
        </div>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <div class="flex flex-wrap justify-center flex-1">
                <tail-admin-complaint-projection class="mt-4 mr-4" v-for="p in pagination.page.items" :projection="p"
                    @on-edit="navigateTo(`/admin/complaint/edit?id=${$event}`)" />
            </div>
            <br>
            <tail-pagination class="self-center" v-model="page" @update:modelValue="getComplaint"
                :min-page="1" :max-page="pagination.page.pages" />
        </div>
        <tail-error class="mt-2" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
    </div>
</template>