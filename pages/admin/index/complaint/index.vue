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

const start = () => searchComplaintProjection(status.value, search.value, page.value).then(handle({
    onSuccess: onSuccess(pagination),
    onFailure: onFailure(hasRemoteError)
}))

watch(status, start)

start()
</script>

<template>
    <div class="flex flex-col p-4">
        <div class="flex flex-col gap-4">
            <h1 class="font-amatic-sc text-6xl self-start">
                Denúncias
            </h1>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
            <tail-select
                :data="pagination.statuses"
                :visual-transform="status => status.description"
                :value-transform="status => status.code"
                v-model="status"
            />
        </div>
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col justify-between flex-1">
            <div class="flex flex-wrap justify-center gap-4">
                <tail-admin-complaint-projection
                    v-for="p in pagination.page.items"
                    :projection="p"
                    @click="navigateTo(`/admin/complaint/view?id=${p.id}`)"
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
    </div>
</template>