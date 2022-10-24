<script setup lang="ts">
import { AnimalProjection } from '~~/composables/user/Animal'

const animalProjections = ref<Array<AnimalProjection>>([])
const onDeleteData = ref(0)

const hasRemoteError = ref(false)

function getAnimal() {
    getAnimalProjection().then(handle({
        onFailure: error => {
            console.log(JSON.stringify(error))
            hasRemoteError.value = true
        },
        onSuccess: result => animalProjections.value = result
    }))
}

function onClick(projection: AnimalProjection) {
    console.log("click", projection)
}

function onDelete({ id }: AnimalProjection) {
    onDeleteData.value = id
}

function onDeleteConfirmed() {
    deleteAnimal(`${onDeleteData.value}`).then(handle({
        onFailure: error => {
            console.log(error)
            hasRemoteError.value = true
        },
        onNullSucess: () => {
            onDeleteData.value = 0
            getAnimal()
        }
    }))
}

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
        <h1 class="font-amatic-sc text-6xl">
            Conteúdo
        </h1>
        <div class="flex flex-wrap justify-center" v-if="!hasRemoteError">
            <tail-user-animal-projection class="mt-4 mr-2" v-for="projection in animalProjections"
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