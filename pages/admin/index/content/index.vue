<script setup lang="ts">
import { ContentProjection } from '~~/composables/admin/Content'

const page = ref(1)
const search = ref("")

const pagination = ref(emptyPage<ContentProjection>())

const onDelete = ref(0)

const hasRemoteError = ref(false)

const getContent = () => getContentProjection(search.value, page.value).then(handle({
    onFailure: onFailure(hasRemoteError),
    onSuccess: onSuccess(pagination)
}))

const onDeleteConfirmed = () => deleteContent(`${onDelete.value}`).then(handle({
    onFailure: onFailure(hasRemoteError),
    onNullSucess: getContent,
    finally: () => {
        onDelete.value = 0
        page.value = 1
    }
}))

getContent()
</script>

<template>
    <div class="flex flex-col pt-4 pl-4 pb-32">
        <div class="flex flex-col items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Conteúdo
            </h1>
            <br>
            <tail-input-search class="pr-4" v-model="search" @on-search="page = 1; getContent()" />
        </div>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <div class="flex flex-wrap justify-center flex-1">
                <tail-admin-content-projection class="mt-4 mr-4" v-for="p in pagination.items" :projection="p"
                    @on-delete="onDelete = $event" @on-edit="navigateTo(`/admin/content/edit?id=${$event}`)" />
            </div>
            <br>
            <tail-pagination class="self-center" v-model="page" @update:modelValue="getContent"
                :min-page="1" :max-page="pagination.pages" />
        </div>
        <tail-error class="mt-2 mr-4" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
        <tail-modal-warn-delete v-if="onDelete" @on-confirm="onDeleteConfirmed" @on-dismiss="onDelete = 0" />
        <tail-fab-add @click="navigateTo('content/add')" />
    </div>
</template>