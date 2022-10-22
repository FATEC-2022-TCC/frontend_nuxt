<script setup lang="ts">
defineProps({
    title: String
})
</script>

<template>
    <tail-button-base class="
            w-full
            bg-seashell
            text-blue-violet
            box-border
            border-2
            border-transparent
            hover:border-blue-violet
        ">
        <p>
            {{ title }}
        </p>
    </tail-button-base>
</template>