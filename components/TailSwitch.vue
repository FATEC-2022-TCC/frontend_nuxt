<script setup lang="ts">
defineProps({
    modelValue: Boolean
})
</script>

<template>
    <div>
        <div class="relative bg-blue-violet p-2 rounded-full h-10 w-20 cursor-pointer"
            @click="$emit('update:modelValue', !modelValue)">
            <div class="absolute bg-burnt-yellow rounded-full w-6 h-6" :class="!modelValue ? 'left-2' : 'right-2'"></div>
        </div>
    </div>
</template>