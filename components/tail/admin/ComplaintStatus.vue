<script setup lang="ts">
import { Status } from '~~/composables/admin/Complaint';
defineProps<{
    status: Status
}>()
</script>

<template>
    <div class="border border-blue-violet p-4 rounded mt-4">
        <h1 class="text-4xl font-amatic-sc">Descrição: &nbsp;</h1>
        <p class="whitespace-pre-wrap"> {{ status.description }}</p>
        <br>
        <h1 class="text-4xl font-amatic-sc">Criado por: &nbsp;</h1>
        <p> {{ status.createdBy }} às {{ formatDate(status.created) }}</p>
        <div v-if="status.files.length">
            <br>
            <h1 class="text-4xl font-amatic-sc">Fotos: &nbsp;</h1>
            <div class="mt-2 flex flex-wrap justify-center gap-2">
                <img v-for="f in status.files" :src="f.data" class="w-48">
            </div>
        </div>
    </div>
</template>