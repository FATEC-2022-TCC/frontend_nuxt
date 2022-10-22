<script setup lang="ts">
defineProps({
    title: String
})
</script>

<template>
    <tail-button-base class="
            w-full
            bg-blue-violet
            text-white
            border-2
            border-blue-violet
        ">
        <p>
            {{ title }}
        </p>
    </tail-button-base>
</template>