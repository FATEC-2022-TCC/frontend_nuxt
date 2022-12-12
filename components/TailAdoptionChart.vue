<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { AdoptionDataChart } from '~~/composables/admin/Chart';

ChartJS.register(ArcElement, Tooltip, Legend)

defineProps<{
    modelValue: Array<AdoptionDataChart>
}>()
const emit = defineEmits<{
    (event: 'onPieClick', index: number): void
}>()

const options: ChartOptions = {
    responsive: true,
    onClick(event, elements) {
        const index = elements[0].index
        emit('onPieClick', index)
    }
}
</script>

<template>
    <pie
        :data="{
            labels: modelValue.map(e => e.name),
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