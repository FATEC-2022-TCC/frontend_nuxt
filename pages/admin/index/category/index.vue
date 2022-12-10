<script setup lang="ts">
import { CategoryProjection } from '~~/composables/admin/Category';

const search = ref("")
const page = ref(1)

const pagination = ref(emptyPage<CategoryProjection>())

const hasRemoteError = ref(false)

const start = () => searchCategoryProjection(search.value, page.value).then(handle({
    onSuccess: onSuccess(pagination),
    onFailure: onFailure(hasRemoteError)
}))

start()
</script>

<template>
    <tail-loading-page class="flex flex-col gap-4 p-4 pb-" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl self-start">
            Categorias
        </h1>
        <tail-input-search v-model="search" @on-search="page = 1; start()" />
        <div class="flex-1 flex flex-col justify-between">
            <div class="flex flex-col gap-4 justify-center">
                <tail-admin-category-projection v-for="p in pagination.items" :projection="p"
                    @on-edit="navigateTo(`/admin/category/edit?id=${$event}`)" />
            </div>
            <tail-pagination class="self-center" v-model="page" @update:model-value="start" :min-page="1"
                :max-page="pagination.pages" />
        </div>
        <tail-fab-add @click="navigateTo('category/add')" />
    </tail-loading-page>
</template>