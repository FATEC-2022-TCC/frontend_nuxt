<script setup lang="ts">
defineProps({
    title: String
})
</script>

<template>
    <tail-base-button 
        class="
            bg-seashell
            text-blue-violet
            box-border
            border-2
            border-transparent
            hover:border-blue-violet
        "
        :title="title" 
    />
</template>