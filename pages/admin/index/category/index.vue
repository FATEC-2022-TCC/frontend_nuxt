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
    <div class="flex flex-col p-4 pb-32">
        <div class="flex flex-col items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Categorias
            </h1>
            <br>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
        </div>
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col justify-between flex-1">
            <div class="flex flex-col gap-4">
                <tail-admin-category-projection
                    v-for="p in pagination.items"
                    :projection="p"
                    @on-edit="navigateTo(`/admin/category/edit?id=${$event}`)"
                />
            </div>
            <br>
            <tail-pagination
                class="self-center"
                v-model="page"
                @update:model-value="start"
                :min-page="1"
                :max-page="pagination.pages"
            />
        </div>
        <tail-error v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
        <tail-fab-add @click="navigateTo('category/add')" />
    </div>
</template>