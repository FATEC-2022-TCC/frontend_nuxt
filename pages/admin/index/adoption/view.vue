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

if (!id) navigateTo("/admin/adoption")
else start()

function onAddStatus(request: StatusRequest) {
    addAdoptionStatus({
        id: parseInt(id),
        status: request
    }).then(handle({
        onNullSucess: () => {
            start()
            addStatusKey.value++
        },
        onFailure: onFailure(hasRemoteError)
    }))
}

</script>

<template>
    <tail-loading-page class="flex flex-col p-4 gap-4" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl">
            Analisar adoção
        </h1>
        <tail-button-blue-violet title="Visualizar requisições de adoção"
            @click="navigateTo(`requests?id=${response?.data.id}`)" />
        <div v-if="response">
            <h1 class="text-4xl font-amatic-sc">Nome: &nbsp;</h1>
            <p> {{ response.data.name }}</p>
            <br>
            <h1 class="text-4xl font-amatic-sc">Descrição: &nbsp;</h1>
            <p> {{ response.data.description }}</p>
            <br>
            <h1 class="text-4xl font-amatic-sc">Foto de perfil: &nbsp;</h1>
            <img :src="response.data.picture" />
            <br>
            <h1 class="text-4xl font-amatic-sc">Imagens: &nbsp;</h1>
            <div class="flex flex-wrap justify-center gap-4">
                <img v-for="f in response.data.images" :src="f.data" class="w-48">
            </div>
            <br>
            <div class="flex flex-col gap-4">
                <tail-admin-status v-for="status in response.data.statuses" :status="status" />
                <tail-admin-add-status
                    :key="addStatusKey" 
                    v-if="response.allowedStatus.length"
                    :statuses="response.allowedStatus" @on-add-status="onAddStatus"
                />
            </div>
        </div>
    </tail-loading-page>
</template>