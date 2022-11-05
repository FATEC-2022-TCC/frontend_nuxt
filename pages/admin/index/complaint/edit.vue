<script setup lang="ts">
import { ComplaintResponse, UpdateComplaintRequest } from '~~/composables/admin/Complaint';

const route = useRoute()

const response = ref<ComplaintResponse | null>(null)
const addStatusKey = ref(0)

const hasRemoteError = ref(false)

const id = route.query["id"]?.toString() ?? ''

function getCompliant() {
    getComplaint(id).then(handle({
        onSuccess: onSuccess(response),
        onFailure: onFailure(hasRemoteError)
    }))
}

if (!id) navigateTo("/admin/complaint")
getCompliant()

function onAddStatus(request: UpdateComplaintRequest) {
    addComplaintStatus({
        id: parseInt(id),
        status: request.status
    }).then(handle({
        onSuccess: _ => {
            getCompliant()
            addStatusKey.value++
        },
        onFailure: onFailure(hasRemoteError)
    }))
}

</script>

<template>
    <div class="flex flex-col p-4">
        <h1 class="font-amatic-sc text-6xl">
            Analisar denúncia
        </h1>
        <br>
        <div v-if="response && !hasRemoteError">
            <div class="ml-4">
                <h1 class="text-4xl font-amatic-sc">Local: &nbsp;</h1>
                <p> {{ response.complaint.local }}</p>
                <br>
                <h1 class="text-4xl font-amatic-sc">Descrição: &nbsp;</h1>
                <p> {{ response.complaint.description }}</p>
                <br>
                <h1 class="text-4xl font-amatic-sc">Imagens: &nbsp;</h1>
                <div class="mt-2 flex flex-wrap justify-center gap-2">
                    <img v-for="f in response.complaint.files" :src="f.data" class="w-48">
                </div>
                <tail-admin-complaint-status v-for="status in response.complaint.statuses" :status="status" />
                <br>
                <tail-admin-complaint-add-status :key="addStatusKey" v-if="response.allowedStatus.length"
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