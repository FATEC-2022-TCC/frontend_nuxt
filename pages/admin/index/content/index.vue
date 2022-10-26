<script setup lang="ts">
import { ContentProjection } from '~~/composables/admin/Content'

const contentProjections = ref<Array<ContentProjection>>([])
const onDeleteData = ref(0)

const hasRemoteError = ref(false)

function getContent() {
    getContentProjection().then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(contentProjections)
    }))
}

function onClick(projection: ContentProjection) {
    console.log("click", projection)
}

function onDelete({ id }: ContentProjection) {
    onDeleteData.value = id
}

function onDeleteConfirmed() {
    deleteContent(`${onDeleteData.value}`).then(handle({
        onFailure: error => {
            console.log(error)
            hasRemoteError.value = true
            onDeleteData.value = 0
        },
        onNullSucess: () => {
            onDeleteData.value = 0
            getContent()
        }
    }))
}

function onDeleteRevoked() {
    onDeleteData.value = 0
}

function onEdit({ id }: ContentProjection) {
    navigateTo(`/admin/content/edit?id=${id}`)
}

function onSearchEnter(value: string) {
    alert(value)
}

getContent()
</script>

<template>
    <div class="pt-4 pl-4 pb-32">
        <div class="flex items-center justify-between space-x-2">
            <h1 class="font-amatic-sc text-6xl">
                Conteúdo
            </h1>
            <tail-input-search class="pr-4" @onEnter="onSearchEnter" />
        </div>
        <div class="flex flex-wrap justify-center" v-if="!hasRemoteError">
            <tail-admin-content-projection class="mt-4 mr-4" v-for="projection in contentProjections"
                :projection="projection" @onClick="onClick" @onDelete="onDelete" @onEdit="onEdit" />
        </div>
        <tail-error class="mt-2" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
        <tail-modal-warn-delete v-if="onDeleteData" @onClick="onDeleteConfirmed" @onDismiss="onDeleteRevoked" />
        <tail-fab-add @click="() => navigateTo('content/add')" />
    </div>
</template>