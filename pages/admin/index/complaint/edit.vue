<script setup lang="ts">
import { ComplaintResponse } from '~~/composables/admin/Complaint';

const modal = useModal()
const route = useRoute()

const complaintResponse = ref<ComplaintResponse | null>(null)

const hasRemoteError = ref(false)

const id = route.query["id"]?.toString() ?? ''

if (!id) navigateTo("/admin/complaint")
else getComplaint(id).then(handle({
    onSuccess: onSuccess(complaintResponse),
    onFailure: onFailure(hasRemoteError)
}))

</script>

<template>
    <div class="flex flex-col p-4 pb-32">
        <h1 class="font-amatic-sc text-6xl">
            Analisar denúncia
        </h1>
        <br>
        <div v-if="complaintResponse && !hasRemoteError">
            <div class="ml-4">
                <h1 class="text-4xl font-amatic-sc">Local: &nbsp;</h1>
                <p> {{ complaintResponse.complaint.local }}</p>
                <br>
                <h1 class="text-4xl font-amatic-sc">Descrição: &nbsp;</h1>
                <p> {{ complaintResponse.complaint.description }}</p>
                <br>
                <h1 class="text-4xl font-amatic-sc">Imagens: &nbsp;</h1>
                <div class="mt-2 flex flex-wrap justify-center gap-2">
                    <img v-for="f in complaintResponse.complaint.files" :src="f.data" class="w-48">
                </div>
            </div>
            <br>
            <br>

        </div>
        <div v-else-if="!hasRemoteError">
            <p>Carregando...</p>
        </div>
        <tail-error v-else>
            <p>Alguma coisa deu errada.</p>
            <p>Tente novamente mais tarde!</p>
        </tail-error>
        <tail-fab-save />
    </div>
</template>