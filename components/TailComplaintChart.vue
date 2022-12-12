<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions} from 'chart.js'
import { Pie } from 'vue-chartjs'
import { ComplaintDataChart } from '~~/composables/admin/Chart';

ChartJS.register(ArcElement, Tooltip, Legend)

const options: ChartOptions = {
    responsive: true,
    onClick(event, elements) {
        const index = elements[0].index
        console.log(index)
    }
}
defineProps<{
    modelValue: Array<ComplaintDataChart>
}>()
</script>

<template>
    <pie
        :data="{
            labels: modelValue.map(e => e.description),
            datasets: [
                {
                    backgroundColor: modelValue.map(e => e.color),
                    data: modelValue.map(e => e.count)
                }
            ]
        }" 
        :options=options
    />
</template>