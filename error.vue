<script setup lang="ts">
defineProps({
    error: Object
})
</script>

<template>
    <div class="bg-blue-violet h-screen w-screen p-16 flex justify-center items-center flex-col">
        <h1 class="font-amatic-sc text-8xl text-white">
            Ops !!!
        </h1>
        <br>
        <h2 class="text-6xl font-amatic-sc text-white text-center">
            {{ error?.message ?? "Alguma coisa deu errada!"}}
        </h2>
        <br>
        <br>
        <button class="bg-burnt-yellow text-blue-violet hover:text-white rounded shadow p-6 font-amatic-sc text-6xl"
            @click="clearError({ redirect: '/home' })">
            Voltar para a página inicial
        </button>
    </div>
</template>