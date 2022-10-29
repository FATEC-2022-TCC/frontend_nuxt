<script setup lang="ts">
import { ContentProjection } from '~~/composables/admin/Content'

const contentProjections = ref<Array<ContentProjection>>([])
const onDelete = ref(0)

const currentPage = ref(1)
const maxPages = ref(1)

const hasRemoteError = ref(false)

function getContent() {
    getContentProjection().then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(contentProjections)
    }))
}

function onDeleteConfirmed() {
    deleteContent(`${onDelete.value}`).then(handle({
        onFailure: onFailure(hasRemoteError, () => onDelete.value = 0),
        onNullSucess: () => {
            onDelete.value = 0
            getContent()
        }
    }))
}

function onSearchEnter(value: string) {
    alert(value)
}

getContent()
</script>

<template>
    <div class="flex flex-col pt-4 pl-4 pb-32">
        <div class="flex items-center justify-between space-x-2">
            <h1 class="font-amatic-sc text-6xl">
                Conteúdo
            </h1>
            <tail-input-search class="pr-4" @onEnter="onSearchEnter" />
        </div>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <div class="flex flex-wrap justify-center flex-1">
                <tail-admin-content-projection class="mt-4 mr-4" v-for="projection in contentProjections"
                    :projection="projection" @onDelete="onDelete = $event"
                    @onEdit="navigateTo(`/admin/content/edit?id=${$event}`)" />
            </div>
            <br>
            <tail-pagination
                class="self-end"
                v-model="currentPage" 
                :min-page="1"
                :max-page="maxPages"
            />
        </div>
        <tail-error class="mt-2" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
        <tail-modal-warn-delete v-if="onDelete" @onClick="onDeleteConfirmed" @onDismiss="onDelete = $event" />
        <tail-fab-add @click="navigateTo('content/add')" />
    </div>
</template>