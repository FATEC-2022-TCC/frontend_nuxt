<script setup lang="ts">
defineProps({
    title: String
})
</script>

<template>
    <button 
        class="
            px-8 
            py-3 
            rounded-3xl 
            cursor-pointer 
            hover:shadow-2xl 
            transition-shadow
        ">{{ title }}</button>
</template>