<script setup lang="ts">
import { ComplaintDataChart } from '~~/composables/admin/Chart';

const hasRemoteError = ref(false)

const complaintDataChart = ref(emptyList<ComplaintDataChart>())

getComplaintDataChart().then(handle({
    onFailure: onFailure(hasRemoteError),
    onSuccess: onSuccess(complaintDataChart)
}))
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <h1 class="font-amatic-sc text-6xl">
            Página inicial
        </h1>
        <br>
        <div class="h-96">
            <h1 class="font-amatic-sc text-4xl">
                Denúncias
            </h1>
            <tail-complaint-chart v-if="complaintDataChart.length" v-model="complaintDataChart" />
            <p v-else>Não há denúncias</p>
        </div>
    </div>
</template>