<script setup lang="ts">
import { AnimalResponse } from '~~/composables/user/Animal';

const route = useRoute()

const id = route.query["id"]?.toString() ?? ''

const response = ref<AnimalResponse | null>(null)
const hasRemoteError = ref(false)

if (!id) navigateTo("/home/adoption")
else start()

function start() {
    getAnimal(id).then(handle({
        onSuccess: onSuccess(response),
        onFailure: onFailure(hasRemoteError)
    }))
}
</script>

<template>
    <tail-loading-page class="flex flex-col" :has-remote-error="hasRemoteError">
        <div v-if="response" class="flex-1 flex bg-white">
            <div class="flex-1 flex flex-col md:flex-row">
                <div class="flex-1">
                    <img class="w-full rounded" :src="response.picture">
                </div>
                <div class="flex-1 flex flex-col justify-between p-4">
                    <div>
                        <h1 class="text-4xl font-amatic-sc">Nome:</h1>
                        <p class="text-xl"> {{ response.name }}</p>
                        <br>
                        <h1 class="text-4xl font-amatic-sc">Descrição:</h1>
                        <p class="text-xl"> {{ response.description }}</p>
                        <br>
                        <h1 class="text-4xl font-amatic-sc">Características:</h1>
                        <p class="text-xl">{{ [response.category.name, response.gender, response.size, response.age].join(' | ') }} </p>
                    </div>
                </div>
            </div>
        </div>
    </tail-loading-page>
</template>