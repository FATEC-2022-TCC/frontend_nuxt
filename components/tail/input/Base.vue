<script setup lang="ts">
defineProps({
    placeholder: String,
    type: String,
    modelValue: String
})
</script>

<template>
    <input
        class="p-2 rounded-md bg-seashell border-2 border-blue-violet outline-none"
        :type="type" 
        :placeholder="placeholder" 
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />
</template>