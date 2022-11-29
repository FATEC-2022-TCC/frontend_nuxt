<script setup lang="ts">
import { AdoptionResponse } from '~~/composables/admin/Adoption';
import { StatusRequest } from '~~/composables/api/Status';

const route = useRoute()

const response = ref<AdoptionResponse | null>(null)
const addStatusKey = ref(0)

const hasRemoteError = ref(false)

const id = route.query["id"]?.toString() ?? ''

function start() {
    getAdoption(id).then(handle({
        onSuccess: onSuccess(response),
        onFailure: onFailure(hasRemoteError)
    }))
}

if (!id) navigateTo("/admin/complaint")
else start()

function onAddStatus(request: StatusRequest) {
    addAdoptionStatus({
        id: parseInt(id),
        status: request
    }).then(handle({
        onSuccess: _ => {
            start()
            addStatusKey.value++
        },
        onFailure: onFailure(hasRemoteError)
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
                <p> {{ response.data.name }}</p>
                <br>
                <h1 class="text-4xl font-amatic-sc">Descrição: &nbsp;</h1>
                <p> {{ response.data.description }}</p>
                <br>
                <br>
                <h1 class="text-4xl font-amatic-sc">Foto de perfil: &nbsp;</h1>
                <img :src="response.data.picture" />
                <br>
                <h1 class="text-4xl font-amatic-sc">Imagens: &nbsp;</h1>
                <div class="mt-2 flex flex-wrap justify-center gap-2">
                    <img v-for="f in response.data.images" :src="f.data" class="w-48">
                </div>
                <br>
                <tail-admin-status v-for="status in response.data.statuses" :status="status" />
                <br>
                <tail-admin-add-status :key="addStatusKey" v-if="response.allowedStatus.length"
                    :statuses="response.allowedStatus" @on-add-status="onAddStatus" />
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