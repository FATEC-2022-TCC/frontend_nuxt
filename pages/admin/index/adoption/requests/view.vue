<script setup lang="ts">
import { AdoptionRequestResponse } from '~~/composables/admin/AdoptionRequest';
import { StatusRequest } from '~~/composables/api/Status';

const route = useRoute()

const addStatusKey = ref(0)

const response = ref<AdoptionRequestResponse | null>(null)

const hasRemoteError = ref(false)

const id = route.query["id"]?.toString() ?? ''
const animalId = route.query["animal"]?.toString() ?? ''

if (!id || !animalId) navigateTo('/admin/adoption')
else start()

function start() {
    getAdoptionRequest(id).then(handle({
        onFailure: onFailure(hasRemoteError),
        onSuccess: onSuccess(response)
    }))
}

function onAddStatus(request: StatusRequest) {
    addAdoptionRequestStatus({
        id: parseInt(id),
        status: request
    }).then(handle({
        onNullSucess: () => {
            addStatusKey.value++
            start()
        },
        onFailure: onFailure(hasRemoteError)
    }))
}

</script>

<template>
    <tail-loading-page class="flex flex-col gap-4 p-4" :has-remote-error="hasRemoteError">
        <h1 class="font-amatic-sc text-6xl">
            Analisar requisição de adoção
        </h1>
        <tail-button-blue-violet title="Visualizar requisições de adoção"
            @click="navigateTo(`/admin/adoption/requests?id=${animalId}`)" />
        <tail-button-blue-violet title="Visualizar o animal"
            @click="navigateTo(`/admin/adoption/view?id=${animalId}`)" />
        <div v-if="response" class="flex flex-col gap-4">
            <div>
                <h1 class="text-4xl font-amatic-sc">Adoção requisitada por: &nbsp;</h1>
                <p> {{ response.data.createdBy }}</p>
            </div>
            <tail-admin-status v-for="status in response.data.statuses" :status="status" />
            <tail-admin-add-status :key="addStatusKey" v-if="response.allowedStatus.length"
                :statuses="response.allowedStatus" @on-add-status="onAddStatus" />
        </div>
    </tail-loading-page>
</template>