<script setup lang="ts">
import { ContentProjection } from '~~/composables/admin/Content'

const page = ref(1)
const search = ref("")

const pagination = ref(emptyPage<ContentProjection>())

const onDeleteData = ref(0)

const hasRemoteError = ref(false)

const start = () => searchContentProjection(search.value, page.value).then(handle({
    onFailure: onFailure(hasRemoteError),
    onSuccess: onSuccess(pagination)
}))

const onDeleteConfirmed = () => deleteContent(`${onDeleteData.value}`).then(handle({
    onFailure: onFailure(hasRemoteError),
    onNullSucess: start,
    finally: () => {
        onDeleteData.value = 0
        page.value = 1
    }
}))

start()
</script>

<template>
    <tail-loading-page class="flex flex-col p-4 gap-4 pb-32" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl self-start">
            Conteúdo
        </h1>
        <tail-input-search v-model="search" @on-search="page = 1; start()" />
        <div class="flex-1 flex flex-col gap-4 justify-between">
            <div class="flex flex-wrap gap-4 justify-center">
                <tail-admin-content-projection
                v-for="p in pagination.items"
                :projection="p"
                @on-delete="onDeleteData = p.id"
                @on-edit="navigateTo(`/admin/content/edit?id=${p.id}`)" />
            </div>
            <tail-pagination
                class="self-center"
                v-model="page"
                @update:model-value="start"
                :min-page="1"
                :max-page="pagination.pages"
            />
        </div>
        <tail-modal-warn-delete
            v-if="onDeleteData"
            @on-confirm="onDeleteConfirmed"
            @on-dismiss="onDeleteData = 0"
        />
        <tail-fab-add @click="navigateTo('content/add')" />
    </tail-loading-page>
</template>