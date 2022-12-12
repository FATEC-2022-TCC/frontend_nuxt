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

function paramChange() {
    page.value = 1
    start()
}

watch(status, paramChange)

start()
</script>

<template>
    <tail-loading-page class="flex flex-col gap-4 p-4" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl self-start">
            Denúncias
        </h1>
        <tail-input-search v-model="search" @on-search="page = 1; start()" />
        <tail-select
            :data="pagination.statuses"
            :visual-transform="status => status.description"
            :value-transform="status => status.code" v-model="status"
        />
        <div class="flex-1 flex flex-col gap-4 justify-between">
            <div class="flex flex-wrap gap-4 justify-center">
                <tail-admin-complaint-projection
                    v-for="p in pagination.page.items"
                    :projection="p"
                    @click="navigateTo(`complaint/view?id=${p.id}`)"
                />
            </div>
            <tail-pagination
                class="self-center"
                v-model="page"
                @update:model-value="start"
                :min-page="1"
                :max-page="pagination.page.pages"
            />
        </div>
    </tail-loading-page>
</template>