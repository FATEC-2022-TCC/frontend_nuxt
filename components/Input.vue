<script setup lang="ts">
defineProps({
    placeholder: String,
    type: String,
    modelValue: String
})
</script>

<template>
    <input 
        :type="type" 
        :placeholder="placeholder" 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)" />
</template>

<style>

</style>