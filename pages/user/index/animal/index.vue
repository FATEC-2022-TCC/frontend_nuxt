<script setup lang="ts">
import { AnimalProjection } from '~~/composables/user/Animal'

const page = ref(1)
const search = ref("")

const pagination = ref(emptyPage<AnimalProjection>())
const onDeleteData = ref(0)

const hasRemoteError = ref(false)

const start = () => getAnimalProjection(search.value, page.value).then(handle({
    onFailure: onFailure(hasRemoteError),
    onSuccess: onSuccess(pagination)
}))

function onClick(projection: AnimalProjection) {
    console.log("click", projection)
}

function onDelete({ id }: AnimalProjection) {
    onDeleteData.value = id
}

const onDeleteConfirmed = () => deleteAnimal(`${onDeleteData.value}`).then(handle({
    onFailure: onFailure(hasRemoteError),
    finally: () => {
        onDeleteData.value = 0
        start()
    }
}))

function onDeleteRevoked() {
    onDeleteData.value = 0
}

function onEdit({ id }: AnimalProjection) {
    // navigateTo(`/user/user/edit?id=${id}`)
}

start()
</script>

<template>
    <div class="flex flex-col p-4 pb-32">
        <div class="flex flex-col items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Meus animais
            </h1>
            <br>
            <tail-input-search v-model="search" @on-search="page = 1; start()" />
        </div>
        <br>
        <div v-if="!hasRemoteError" class="flex flex-col justify-between flex-1">
            <div class="flex flex-wrap justify-center gap-4">
                <tail-user-animal-projection
                    v-for="p in pagination.items"
                    :projection="p"
                    @on-click="onClick"
                    @on-delete="onDelete"
                    @on-edit="onEdit"
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
            <tail-modal-warn-delete
                v-if="onDeleteData"
                @on-click="onDeleteConfirmed"
                @on-dismiss="onDeleteRevoked"
            />
            <tail-fab-add @click="navigateTo('animal/add')" />
        </div>
        <tail-error v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
    </div>
</template>