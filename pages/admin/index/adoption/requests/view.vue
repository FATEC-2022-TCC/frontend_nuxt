<script setup lang="ts">
import { AdoptionRequestResponse } from '~~/composables/admin/AdoptionRequest';
import { StatusRequest } from '~~/composables/api/Status';

const route = useRoute()

const addStatusKey = ref(0)

const response = ref<AdoptionRequestResponse | null>(null)

const hasRemoteError = ref(false)

const id = route.query["id"]?.toString() ?? ''

if (!id) navigateTo('/admin/adoption')
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
    <div class="flex flex-col p-4">
        <h1 class="font-amatic-sc text-6xl">
            Analisar requisição de adoção
        </h1>
        <br>
        <div v-if="response && !hasRemoteError">
            <div class="ml-4">
                <h1 class="text-4xl font-amatic-sc">Criado por: &nbsp;</h1>
                <p> {{ response.data.createdBy }}</p>
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