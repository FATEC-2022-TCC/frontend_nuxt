<script setup lang="ts">
import { Adoption } from '~~/composables/user/Adoption';

const route = useRoute()

const id = route.query["id"]?.toString() ?? ''

const hasRemoteError = ref(false)
const response = ref<Adoption | null>()

if (!id) navigateTo('/user/adoption')
else start()

function start() {
    getUserAdoption(id).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(response)
    }))
}
</script>

<template>
    <div class="flex flex-col p-4">
        <h1 class="font-amatic-sc text-6xl">
            Analisar adoção
        </h1>
        <br>
        <div v-if="response && !hasRemoteError">
            <div class="ml-4">
                <h1 class="text-4xl font-amatic-sc">Nome: &nbsp;</h1>
                <p> {{ response.name }}</p>
                <br>
                <h1 class="text-4xl font-amatic-sc">Descrição: &nbsp;</h1>
                <p> {{ response.description }}</p>
                <br>
                <br>
                <h1 class="text-4xl font-amatic-sc">Foto de perfil: &nbsp;</h1>
                <img :src="response.picture" />
                <br>
                <h1 class="text-4xl font-amatic-sc">Imagens: &nbsp;</h1>
                <div class="mt-2 flex flex-wrap justify-center gap-2">
                    <img v-for="f in response.images" :src="f.data" class="w-48">
                </div>
            </div>
            <div>
                <div class="ml-4" v-for="request in response.requests">
                    <h1 class="text-4xl font-amatic-sc">Requisição de adoção: &nbsp;</h1>
                    <tail-admin-status
                        v-for="status in request.statuses"
                        :status="status"
                    />
                    <br>
                </div>
            </div>
        </div>
        <div v-else-if="!hasRemoteError">
            <p>Carregando...</p>
        </div>
        <tail-error v-else>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
    </div>
</template>