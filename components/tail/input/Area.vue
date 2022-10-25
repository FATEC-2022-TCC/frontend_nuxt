<script setup lang="ts">
defineProps({
    placeholder: String,
    type: String,
    modelValue: String,
    error: {
        default: "",
        required: false,
        type: String
    }
})
</script>

<template>
    <div>
        <textarea v-bind="$attrs" class="w-full p-2 rounded-md border-2 border-blue-violet outline-none" :type="type"
            :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
        <p v-if="error" class="ml-2 text-red">
            {{ error }}
        </p>
    </div>
</template>