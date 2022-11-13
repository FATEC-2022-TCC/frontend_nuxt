<script setup lang="ts">
import { AnimalProjection } from '~~/composables/user/Animal'

const page = ref(1)
const search = ref("")

const pagination = ref(emptyPage<AnimalProjection>())
const onDeleteData = ref(0)

const hasRemoteError = ref(false)

const getAnimal = () => getAnimalProjection(search.value, page.value).then(handle({
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
        getAnimal()
    }
}))

function onDeleteRevoked() {
    onDeleteData.value = 0
}

function onEdit({ id }: AnimalProjection) {
    // navigateTo(`/user/user/edit?id=${id}`)
}

getAnimal()
</script>

<template>
    <div class="pt-4 pl-2 pb-32">
        <div class="flex flex-col items-center justify-between">
            <h1 class="font-amatic-sc text-6xl self-start">
                Meus animais
            </h1>
            <br>
            <tail-input-search class="pr-4" v-model="search" @on-search="page = 1; getAnimal()" />
        </div>
        <div v-if="!hasRemoteError" class="flex flex-col flex-1">
            <div class="flex flex-wrap justify-center flex-1">
                <tail-user-animal-projection class="mt-4 mr-2" v-for="p in pagination.items" :projection="p"
                    @onClick="onClick" @onDelete="onDelete" @onEdit="onEdit" />
            </div>
            <br>
            <tail-pagination class="self-center" v-model="page" @update:modelValue="getContent" :min-page="1"
                :max-page="pagination.pages" />
        </div>
        <tail-error class="mt-2 mr-4" v-else>
            <p>Algo deu errado!</p>
            <p>Atualize a página e tente novamente.</p>
        </tail-error>
        <tail-modal-warn-delete v-if="onDeleteData" @onClick="onDeleteConfirmed" @onDismiss="onDeleteRevoked" />
        <tail-fab-add @click="() => navigateTo('animal/add')" />
    </div>
</template>