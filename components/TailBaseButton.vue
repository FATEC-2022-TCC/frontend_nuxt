<script setup lang="ts">
defineProps({
    title: String
})
</script>

<template>
    <button 
        class="
            px-8 
            py-2           
            rounded-2xl
            cursor-pointer 
            hover:shadow-lg
            transition-shadow
            font-nunito
            font-bold
            text-xl
        ">{{ title }}</button>
</template>