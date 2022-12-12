<script setup lang="ts">
import { ComplaintResponse } from '~~/composables/admin/Complaint';
import { StatusRequest } from '~~/composables/api/Status';

const route = useRoute()

const response = ref<ComplaintResponse | null>(null)
const addStatusKey = ref(0)

const hasRemoteError = ref(false)

const id = route.query["id"]?.toString() ?? ''

if (!id) navigateTo("/admin/complaint")
else start()

function start() {
    getComplaint(id).then(handle({
        onSuccess: onSuccess(response),
        onFailure: onFailure(hasRemoteError)
    }))
}

function onAddStatus(statusRequest: StatusRequest) {
    addComplaintStatus({
        id: parseInt(id),
        status: statusRequest
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
    <tail-loading-page class="flex flex-col p-4" :has-remote-error="hasRemoteError" :is-loading="!response">
        <h1 class="font-amatic-sc text-6xl">
            Analisar denúncia
        </h1>
        <div class="ml-4" v-if="response">
            <h1 class="text-4xl font-amatic-sc">Local: &nbsp;</h1>
            <p> {{ response.data.local }}</p>
            <br>
            <h1 class="text-4xl font-amatic-sc">Descrição: &nbsp;</h1>
            <p> {{ response.data.description }}</p>
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
    </tail-loading-page>
</template>