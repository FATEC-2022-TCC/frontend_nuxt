<script setup lang="ts">
import { Adoption } from '~~/composables/public/Adoption';

const session = useSession()

const route = useRoute()

const id = route.query["id"]?.toString() ?? ''

const response = ref<Adoption | null>(null)
const hasRemoteError = ref(false)

if (!id) navigateTo("/home/adoption")
else start()

function start() {
    getPublicAdoption(id).then(handle({
        onSuccess: onSuccess(response),
        onFailure: onFailure(hasRemoteError)
    }))
}
</script>

<template>
    <div v-if="response" class="flex-1 flex flex-col bg-white">
        <div class="flex">
            <div class="flex-1">
                <img class="w-full rounded" :src="response.picture">
                <br>
                <div class="flex flex-wrap gap-2 justify-center">
                    <img class="w-32" v-for="img in response.images" :src="img.data">
                </div>
            </div>
            <div class="flex-1 p-4">
                <h1 class="text-4xl font-amatic-sc">Nome:</h1>
                <p class="text-xl"> {{ response.name }}</p>
                <br>
                <h1 class="text-4xl font-amatic-sc">Descrição:</h1>
                <p class="text-xl"> {{ response.description }}</p>
                <br>
                <h1 class="text-4xl font-amatic-sc">Publicado em:</h1>
                <p class="text-xl"> {{ formatDate(response.created) }}</p>
                <br>
                <tail-button-blue-violet v-if="session.token" title="Adotar" />
                <tail-button-blue-violet v-else title="Faça o login para poder solicitar uma adoção"
                    @click="navigateTo('/signin')" />
            </div>
        </div>
        <br>
    </div>
</template>