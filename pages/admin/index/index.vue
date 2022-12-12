<script setup lang="ts">
import { ComplaintDataChart, AdoptionDataChart } from '~~/composables/admin/Chart';

const hasRemoteError = ref(false)

const complaintDataChart = ref(emptyList<ComplaintDataChart>())

const adoptionDataChart = ref(emptyList<AdoptionDataChart>())

getComplaintDataChart().then(handle({
    onFailure: onFailure(hasRemoteError),
    onSuccess: onSuccess(complaintDataChart)
}))

getAdoptionDataChart().then(handle({
    onFailure: onFailure(hasRemoteError),
    onSuccess: onSuccess(adoptionDataChart)
}))
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <h1 class="font-amatic-sc text-6xl">
            Página inicial
        </h1>
        <br>
        <div v-if="complaintDataChart.length" class="flex flex-col h-96">
            <h1 class="font-amatic-sc text-4xl">
                Denúncias
            </h1>
            <div class="flex-1 self-center">
                <tail-complaint-chart v-model="complaintDataChart" />
            </div>
        </div>
        <div v-if="adoptionDataChart.length" class="flex flex-col">
            <h1 class="font-amatic-sc text-4xl">
                Adoções
            </h1>
            <div class="flex-1 self-center">
                <tail-adoption-chart
                    v-model="adoptionDataChart"
                    @on-pie-click="navigateTo(`/admin/adoption/view?id=${adoptionDataChart[$event].id}`)"
                />
            </div>
        </div>
    </div>
</template>